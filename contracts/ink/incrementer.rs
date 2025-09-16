#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod incrementer {
    #[ink(storage)]
    pub struct Incrementer {
        value: i32,
    }

    impl Incrementer {
        /// Constructor that initializes the `i32` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new(init_value: i32) -> Self {
            Self { value: init_value }
        }

        /// Constructor that initializes the `i32` value to `0`.
        #[ink(constructor)]
        pub fn new_default() -> Self {
            Self::new(0)
        }

        /// Increments the stored `i32` value by the given `by` value.
        #[ink(message)]
        pub fn inc(&mut self, by: i32) {
            self.value = self.value.checked_add(by).unwrap();
        }

        /// Returns the current `i32` value.
        #[ink(message)]
        pub fn get(&self) -> i32 {
            self.value
        }

        /// Resets the stored `i32` value to `0`.
        #[ink(message)]
        pub fn reset(&mut self) {
            self.value = 0;
        }
    }
}
