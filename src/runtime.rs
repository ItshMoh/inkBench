use polkadot_sdk::frame_support::{
    runtime,
    derive_impl, parameter_types,
    traits::{ConstU128, ConstU64},
};
use polkadot_sdk::{
    *,
    sp_runtime::{
    traits::{BlakeTwo256, IdentityLookup},
    AccountId32, BuildStorage,
}};


pub type AccountId = AccountId32;
pub type Balance = u128;
pub type Hash = pallet_revive::H256;

#[runtime]
mod runtime {
    #[runtime::runtime]
    #[runtime::derive(
        RuntimeCall,
        RuntimeEvent,
        RuntimeError,
        RuntimeOrigin,
        RuntimeFreezeReason,
        RuntimeHoldReason,
        RuntimeSlashReason,
        RuntimeLockId,
        RuntimeTask,
        RuntimeViewFunction
    )]
    pub struct Runtime;

    #[runtime::pallet_index(0)]
    pub type System = frame_system::Pallet<Runtime>;
    #[runtime::pallet_index(1)]
    pub type Balances = pallet_balances::Pallet<Runtime>;
    #[runtime::pallet_index(2)]
    pub type Timestamp = pallet_timestamp::Pallet<Runtime>;
    #[runtime::pallet_index(3)]
    pub type Revive = pallet_revive::Pallet<Runtime>;
}

#[derive_impl(frame_system::config_preludes::TestDefaultConfig)]
impl frame_system::Config for Runtime {
    type AccountId = AccountId;
    type Lookup = IdentityLookup<Self::AccountId>;
    type Hash = Hash;
    type Hashing = BlakeTwo256;
    type Block = frame_system::mocking::MockBlock<Self>;
    type BlockHashCount = ConstU64<250>;
    type AccountData = pallet_balances::AccountData<Balance>;
}

#[derive_impl(pallet_balances::config_preludes::TestDefaultConfig)]
impl pallet_balances::Config for Runtime {
    // type AccountId = AccountId;
    type Balance = Balance;
    type ExistentialDeposit = ConstU128<1>;
    type AccountStore = System;
    type RuntimeHoldReason = RuntimeHoldReason;
    type RuntimeFreezeReason = RuntimeFreezeReason;
}

impl pallet_timestamp::Config for Runtime {
    type Moment = u64;
    type OnTimestampSet = ();
    type MinimumPeriod = ConstU64<1>;
    type WeightInfo = ();
}

parameter_types! {
    pub const CodeHashLockupDepositPercent: sp_runtime::Perbill = sp_runtime::Perbill::from_percent(0);
}

impl pallet_revive::Config for Runtime {
    type Time = Timestamp;
    type Currency = Balances;
    type RuntimeEvent = RuntimeEvent;
    type RuntimeCall = RuntimeCall;
    type RuntimeHoldReason = RuntimeHoldReason;
    type WeightPrice = ();
    type WeightInfo = ();
    type Precompiles = ();
    type FindAuthor = ();
    type DepositPerByte = ConstU128<1>;
    type DepositPerItem = ConstU128<1>;
    type CodeHashLockupDepositPercent = CodeHashLockupDepositPercent;
    type AddressMapper = pallet_revive::AccountId32Mapper<Self>;
    type UnsafeUnstableInterface = frame_support::traits::ConstBool<false>;
    // type AllowEVMBytecode = frame_support::traits::ConstBool<true>;
    type UploadOrigin = frame_system::EnsureSigned<Self::AccountId>;
    type InstantiateOrigin = frame_system::EnsureSigned<Self::AccountId>;
    type RuntimeMemory = frame_support::traits::ConstU32<{ 128 * 1024 * 1024 }>;
    type PVFMemory = frame_support::traits::ConstU32<{ 512 * 1024 * 1024 }>;
    type ChainId = frame_support::traits::ConstU64<42>;
    type NativeToEthRatio = frame_support::traits::ConstU32<1_000_000>;
    type EthGasEncoder = ();
}

pub fn new_test_externalities() -> sp_io::TestExternalities {
    let mut storage = frame_system::GenesisConfig::<Runtime>::default()
        .build_storage()
        .expect("build storage");

    pallet_balances::GenesisConfig::<Runtime> {
        balances: vec![
            (AccountId::from([1u8; 32]), 1_000_000_000_000_000_u128),
            (AccountId::from([2u8; 32]), 1_000_000_000_000_000_u128),
        ],
        dev_accounts: None,
    }
    .assimilate_storage(&mut storage)
    .expect("assimilate balances");

    sp_io::TestExternalities::new(storage)
}