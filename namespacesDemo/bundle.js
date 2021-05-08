var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function calcFee(daysLate) {
            return daysLate * 0.25;
        }
        Fees.calcFee = calcFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function maxBookAllowed(age) {
        return age < 12 ? 3 : 10;
    }
    Utility.maxBookAllowed = maxBookAllowed;
    function privateFunc() {
        console.log('This is private function');
    }
})(Utility || (Utility = {}));
/// <reference path="utility-functions.ts" />
var result1 = Utility.maxBookAllowed(10);
console.log(result1);
var util = Utility.Fees;
var result2 = util.calcFee(10);
console.log(result2);
