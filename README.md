
# InkBench

A lightweight CLI tool for deploying and benchmarking PolkaVM smart contracts using pallet-revive.

This tool runs contracts in-memory without requiring a full blockchain node, making it ideal for:
- Quick contract testing and gas profiling
- Performance benchmarking of PolkaVM bytecode
- Development iteration on Solidity and ink! contracts compiled to PolkaVM

## Build

```bash
cargo build --release
```

## Usage

### Deploy a contract

```bash
./target/release/revive-bench deploy \
  --code contracts/ink/flipper.polkavm \
  --ctor-hex ""
```

Output:
- `address`: deployed contract address (H160)
- `code_hash`: hash of the deployed code

### Call a deployed contract

```bash
./target/release/revive-bench call \
  --addr <contract-address-hex> \
  --data-hex <calldata-hex> \
  --gas <optional-gas-limit>
```

Output:
- `gas_consumed`: actual gas used
- `gas_required`: minimum gas needed
- `did_revert`: whether the call reverted
- `return_data`: return value as hex

### Benchmark contract calls

```bash
./target/release/revive-bench benchmark \
  --code contracts/ink/flipper.polkavm \
  --data-hex "633aa551" \
  --iterations 100
```

Output:
- `avg_gas`: average gas consumed per call
- `avg_time_ns`: average execution time in nanoseconds

## Notes

- All hex inputs should omit the `0x` prefix
- Contract addresses are H160 format (20 bytes)
- Default iterations for benchmark: 10

## FrontEnd

We currently have a Mockup Frontend Design Present. 

```bash

cd apps
pnpm i
pnpm dev
```
