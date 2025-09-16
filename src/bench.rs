use anyhow::{anyhow, Result};
use polkadot_sdk::{
    sp_io,
    pallet_revive::{
    Pallet as Revive,
    H160, H256, U256, Weight,
    Code, BumpNonce, DepositLimit,
    },
    pallet_revive_uapi,
};
use crate::runtime::{Runtime, RuntimeOrigin, AccountId};

#[derive(Debug, Clone)]
pub struct DeployedContract {
    pub address: H160,
    pub code_hash: H256,
}

#[derive(Debug, Clone)]
pub struct CallOutcome {
    pub gas_consumed: Weight,
    pub gas_required: Weight,
    pub did_revert: bool,
    pub return_data: Vec<u8>,
}

fn default_gas_limit() -> Weight {
    Weight::from_parts(100_000_000_000, 3 * 1024 * 1024)
}
fn default_deposit_limit() -> u128 { 10_000_000_000_000 }

pub fn deploy(
    caller: AccountId,
    bytecode: &[u8],
    constructor_data: &[u8],
    gas_limit: Option<Weight>,
    deposit_limit: Option<u128>,
) -> Result<DeployedContract> {
    let origin_signed = RuntimeOrigin::signed(caller.clone());
    let mut gas = gas_limit.unwrap_or_else(default_gas_limit);
    let dep = deposit_limit.unwrap_or_else(default_deposit_limit);

    let _ = Revive::<Runtime>::map_account(RuntimeOrigin::signed(caller.clone()));

    // Try with retries based on gas_required headroom
    let mut attempts = 0u8;
    loop {
        let res = Revive::<Runtime>::bare_instantiate(
            origin_signed.clone(),
            U256::zero(),
            gas,
            DepositLimit::Balance(dep.into()),
            Code::Upload(bytecode.to_vec()),
            constructor_data.to_vec(),
            None,
            BumpNonce::Yes,
        );

        match res.result {
            Ok(rv) => {
                return Ok(DeployedContract {
                    address: rv.addr,
                    code_hash: H256::from_slice(&sp_io::hashing::blake2_256(bytecode)),
                });
            }
            Err(e) => {
                // If out of gas, bump to gas_required with headroom and retry a few times
                let required = res.gas_required.ref_time();
                if required > gas.ref_time() && attempts < 3 {
                    let bumped = required.saturating_mul(120).saturating_div(100);
                    gas = Weight::from_parts(bumped, res.gas_required.proof_size());
                    attempts += 1;
                    continue;
                }
                return Err(anyhow!("instantiate failed: {:?}", e));
            }
        }
    }
}

pub fn call(
    caller: AccountId,
    address: H160,
    input_data: &[u8],
    gas_limit: Option<Weight>,
    deposit_limit: Option<u128>,
) -> Result<CallOutcome> {
    let origin = RuntimeOrigin::signed(caller.clone());
    let mut gas = gas_limit.unwrap_or_else(default_gas_limit);
    let dep = deposit_limit.unwrap_or_else(default_deposit_limit);
    // Try with retries based on gas_required headroom
    let mut attempts = 0u8;
    loop {
        let res = Revive::<Runtime>::bare_call(
            origin.clone(),
            address,
            U256::zero(),
            gas,
            DepositLimit::Balance(dep.into()),
            input_data.to_vec(),
        );

        match res.result {
            Ok(exec) => {
                let did_revert = exec.flags.contains(pallet_revive_uapi::ReturnFlags::REVERT);
                return Ok(CallOutcome {
                    gas_consumed: res.gas_consumed,
                    gas_required: res.gas_required,
                    did_revert,
                    return_data: exec.data,
                });
            }
            Err(e) => {
                let required = res.gas_required.ref_time();
                if required > gas.ref_time() && attempts < 3 {
                    let bumped = required.saturating_mul(120).saturating_div(100);
                    gas = Weight::from_parts(bumped, res.gas_required.proof_size());
                    attempts += 1;
                    continue;
                }
                return Err(anyhow!("call failed: {:?}", e));
            }
        }
    }
}

