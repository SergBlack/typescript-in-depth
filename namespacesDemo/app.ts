/// <reference path="utility-functions.ts" />

// ======================================================================================
// Task 06.01. Namespaces

const result1 = Utility.maxBookAllowed(10);
console.log(result1);

import util = Utility.Fees;
const result2 = util.calculateLateFee(10);
console.log(result2);
