// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Incrementer {
    int32 private value;

    constructor(int32 init_value) {
        value = init_value;
    }

    function inc(int32 by) public {
        value = value + by;
    }

    function get() public view returns (int32) {
        return value;
    }

    function reset() public {
        value = 0;
    }
}