use std::fs;
use std::time::Instant;

use anyhow::{Context, Result};
use clap::{Parser, Subcommand};
use revive_bench::{
    new_test_externalities, runtime::AccountId, deploy, call,
};
use polkadot_sdk::pallet_revive::{H160, Weight};

#[derive(Parser)]
#[command(about = "In-memory pallet-revive benchmark runner")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Deploy a PolkaVM bytecode blob
    Deploy {
        /// Path to .polkavm file
        #[arg(long)]
        code: String,
        /// Constructor data as hex (no 0x)
        #[arg(long, default_value = "")]
        ctor_hex: String,
    },
    /// Call a deployed contract
    Call {
        /// H160 address hex (no 0x)
        #[arg(long)]
        addr: String,
        /// Calldata hex (no 0x)
        #[arg(long)]
        data_hex: String,
        /// Gas limit (ref_time)
        #[arg(long)]
        gas: Option<u64>,
    },
    /// Deploy and benchmark N calls
    Benchmark {
        /// Path to .polkavm file
        #[arg(long)]
        code: String,
        /// Calldata hex (no 0x)
        #[arg(long)]
        data_hex: String,
        /// Iterations
        #[arg(short, long, default_value_t = 10)]
        iterations: u32,
    },
}

fn parse_hex(s: &str) -> Result<Vec<u8>> {
    let s = s.trim().trim_start_matches("0x");
    Ok(hex::decode(s).context("Invalid hex input")?)
}

fn parse_h160(s: &str) -> Result<H160> {
    let bytes = parse_hex(s)?;
    anyhow::ensure!(bytes.len() == 20, "H160 needs 20 bytes, got {}", bytes.len());
    let mut arr = [0u8; 20];
    arr.copy_from_slice(&bytes);
    Ok(H160(arr))
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Commands::Deploy { code, ctor_hex } => do_deploy(&code, &ctor_hex),
        Commands::Call { addr, data_hex, gas} => do_call(&addr, &data_hex, gas),
        Commands::Benchmark { code, data_hex, iterations } => do_benchmark(&code, &data_hex, iterations),
    }
}

fn do_deploy(code_path: &str, ctor_hex: &str) -> Result<()> {
    let bytecode = fs::read(code_path)
        .with_context(|| format!("failed to read code at {}", code_path))?;
    let ctor = if ctor_hex.is_empty() { vec![] } else { parse_hex(ctor_hex)? };

    new_test_externalities().execute_with(|| {
        let caller = AccountId::from([1u8; 32]);
        let deployed = deploy(caller, &bytecode, &ctor, None, None)?;
        println!("address: 0x{}", hex::encode(deployed.address.0));
        println!("code_hash: 0x{}", hex::encode(deployed.code_hash.0));
        Ok(())
    })
}

fn do_call(addr_hex: &str, data_hex: &str, gas: Option<u64>) -> Result<()> {
    let addr = parse_h160(addr_hex)?;
    let data = parse_hex(data_hex)?;

    new_test_externalities().execute_with(|| {
        let caller = AccountId::from([1u8; 32]);
        let gas_limit = gas.map(|g| Weight::from_parts(g, 0));
        let out = call(caller, addr, &data, gas_limit, None)?;
        println!("gas_consumed: {}", out.gas_consumed.ref_time());
        println!("gas_required: {}", out.gas_required.ref_time());
        println!("did_revert: {}", out.did_revert);
        println!("return_data: 0x{}", hex::encode(out.return_data));
        Ok(())
    })
}

fn do_benchmark(code_path: &str, data_hex: &str, iterations: u32) -> Result<()> {
    let bytecode = fs::read(code_path)
        .with_context(|| format!("failed to read code at {}", code_path))?;
    let data = parse_hex(data_hex)?;

    new_test_externalities().execute_with(|| {
        let caller = AccountId::from([1u8; 32]);
        let deployed = deploy(caller.clone(), &bytecode, &[], None, None)?;
        let mut gas_total: u128 = 0;
        let mut time_total: u128 = 0;

        for _ in 0..iterations {
            let t0 = Instant::now();
            let out = call(caller.clone(), deployed.address, &data, None, None)?;
            let dt = t0.elapsed();
            gas_total += out.gas_consumed.ref_time() as u128;
            time_total += dt.as_nanos();
        }

        let avg_gas = gas_total as f64 / iterations as f64;
        let avg_ns = time_total as f64 / iterations as f64;
        println!("avg_gas: {:.0}", avg_gas);
        println!("avg_time_ns: {:.0}", avg_ns);
        Ok(())
    })
}