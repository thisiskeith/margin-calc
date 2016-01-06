'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MarginCalc = (function () {
    function MarginCalc() {
        _classCallCheck(this, MarginCalc);
    }

    _createClass(MarginCalc, null, [{
        key: 'grossMarginPercentage',

        /**
         * Get gross margin percentage from revenue anc cost. Optionally provide the
         * number of precision units (defaults to 2)
         *
         * @return {number} Gross margin percentage
         */
        value: function grossMarginPercentage(revenue, cost) {
            var precision = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];

            var spec = {
                cost: { check: 'isFinite' },
                revenue: { check: 'isFinite' }
            };

            try {
                MarginCalc.validate(spec, { revenue: revenue, cost: cost });
            } catch (e) {
                throw new Error(e.message);
            }

            var grossProfit = MarginCalc.grossProfit(revenue, cost);
            var grossMargin = parseFloat((grossProfit / revenue * 100).toFixed(precision));

            // Return 0 when not finite
            if (!isFinite(grossMargin)) {
                grossMargin = 0;
            }

            return grossMargin;
        }

        /**
         * Get the gross profit from revenue and cost
         *
         * @return {number} Gross profit
         */

    }, {
        key: 'grossProfit',
        value: function grossProfit(revenue, cost) {

            var spec = {
                cost: { check: 'isFinite' },
                revenue: { check: 'isFinite' }
            };

            try {
                MarginCalc.validate(spec, { revenue: revenue, cost: cost });
            } catch (e) {
                throw new Error(e.message);
            }

            var profit = revenue - cost;

            return profit;
        }

        /**
         * Get mark up percentage from revenue and cost. Optionally provide the
         * number of precision units (defaults to 2)
         *
         * @return {undefined}
         */

    }, {
        key: 'markUpPercentage',
        value: function markUpPercentage(revenue, cost) {
            var precision = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];

            var spec = {
                cost: { check: 'isFinite' },
                revenue: { check: 'isFinite' }
            };

            try {
                MarginCalc.validate(spec, { revenue: revenue, cost: cost });
            } catch (e) {
                throw new Error(e.message);
            }

            var grossProfit = MarginCalc.grossProfit(revenue, cost);
            var markUp = parseFloat((grossProfit / cost * 100).toFixed(precision));

            // Return 0 when not finite
            if (!isFinite(markUp)) {
                markUp = 0;
            }

            return markUp;
        }

        /**
         * Get revenue from gross margin percentage and cost. Optionally provide
         * the number of precision units (defaults to 2)
         *
         * @return {number} Revenue
         */

    }, {
        key: 'revenueFromGrossMarginPercentage',
        value: function revenueFromGrossMarginPercentage(percentage, cost) {
            var precision = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];

            var spec = {
                cost: { check: 'zeroOrGreater' },
                percentage: { check: 'zeroOrGreater' }
            };

            try {
                MarginCalc.validate(spec, { percentage: percentage, cost: cost });
            } catch (e) {
                throw new Error(e.message);
            }

            var revenue = parseFloat((100 * cost / (100 - percentage)).toFixed(precision));

            return revenue;
        }

        /**
         * Global validation helper. Supports regex pattern and boolean function
         * validation specs
         *
         * @return {bool} Valid
         */

    }, {
        key: 'validate',
        value: function validate(spec, subject) {

            var i = undefined;
            var valid = true;

            for (i in spec) {

                var currentSpec = spec[i];
                var check = currentSpec.check;
                var pattern = currentSpec.pattern;

                if (pattern) {

                    var result = MarginCalc.tests[pattern].test(subject[i]);

                    if (!result) {
                        valid = false;
                        break;
                    }
                } else if (check && typeof MarginCalc.tests[check] === 'function') {

                    var result = MarginCalc.tests[check](subject[i]);

                    if (!result) {
                        valid = false;
                        break;
                    }
                }
            }

            return valid;
        }
    }]);

    return MarginCalc;
})();

MarginCalc.tests = {
    isFinite: (function (_isFinite) {
        function isFinite(_x4) {
            return _isFinite.apply(this, arguments);
        }

        isFinite.toString = function () {
            return _isFinite.toString();
        };

        return isFinite;
    })(function (value) {
        return typeof value === "number" && isFinite(value);
    }),
    zeroOrGreater: function zeroOrGreater(value) {
        return value > -1;
    }
};

exports.default = MarginCalc;