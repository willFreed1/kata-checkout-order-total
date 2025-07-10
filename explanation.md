First commit (Red):
- I wrote tests for the main behaviors: scanning per-unit items, scanning weighted items, applying markdowns and buy N get M specials. I also added the method signatures in checkout, but didn't implement them yet. The tests all fail at this point.

Second commit (Green):
- I implemented just enough logic to make all the tests pass. I used maps to store items, markdowns, and specials for fast lookup. I used an array to keep track of scanned items. The logic for specials uses n (number to buy), m (number to get at a discount), and percentOff (the discount percent). No refactoring yet, just the minimum to get green tests.

Third commit (Refactor):
- I moved all the pricing and special logic out of checkout and into pricingRules. now checkout just tracks scanned items and delegates the calculation. the code is cleaner and modular, but the behavior is the same and all tests still pass.

