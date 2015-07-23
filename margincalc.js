'use strict';

var margincalc = {};

margincalc.validate = function (obj) {
    // returns true if valid

    var EX_PREFIX = 'margin-calc exception: ',
        config = {
            cost: [
                'canCalculate',
                'greaterThanZero'],
            revenue: [
                'canCalculate',
                'greaterThanZero'],
            grossMargin: [
                'canCalculate',
                'lessThan100']
        },
        tests = {
            canCalculate: function (property, val) {
                // property passed and must not be undefined, null, or NaN
                if (typeof val === 'undefined' ||
                     val === null ||
                     val.length <= 0 ||
                     val != val) {
                    throw new Error(EX_PREFIX + property + ' must be a number.');
                }
            },
            greaterThanZero: function (property, val) {
                // cost or revenue must be > 0
                if (parseFloat(val) <= 0) {
                    throw new Error(EX_PREFIX + property + ' entered must be greater than 0.');
                }
            },
            lessThan100: function (property, val) {
                // gross margin must be < 100%
                if (parseFloat(val) >= 100) {
                    throw new Error(EX_PREFIX + property + ' entered must be less than 100%.');
                }
            }
        },
        i, j, l;

    // throws immediately if obj input is not correct
    if (!obj || typeof obj !== 'object') {
        throw new Error(EX_PREFIX + ' Validation input must be an object.');
    }

    for (i in obj) {
        j = 0;
        if (obj.hasOwnProperty(i)) {
            l = config[i].length;
            for (; j < l; j += 1) {
                if (tests[config[i][j]]) {
                    tests[config[i][j]](i, obj[i]);
                } else {
                    throw new Error(EX_PREFIX + i + ' missing test from validation tests.');
                }
            }
        }
    }

    return true;
};

margincalc.grossProfit = function (revenue, cost) {
    try {
        this.validate({
            revenue: revenue,
            cost: cost
        });
    } catch (e) {
        throw new Error(e.message);
    }
    return revenue - cost;
};

margincalc.grossMarginPercentage = function (revenue, cost, precision) {
    var p, g;
    try {
        this.validate({
            revenue: revenue,
            cost: cost
        });
    } catch (e) {
        throw new Error(e.message);
    }
    precision = precision || 2;

    p = this.grossProfit(revenue, cost);
    g = parseFloat((p / revenue * 100).toFixed(precision));

    return g;
};

margincalc.markUpPercentage = function (revenue, cost, precision) {
    var p, m;
    try {
        this.validate({
            revenue: revenue,
            cost: cost
        });
    } catch (e) {
        throw new Error(e.message);
    }

    precision = precision || 2;

    p = this.grossProfit(revenue, cost);
    m = parseFloat(((p / cost) * 100).toFixed(precision));

    return m;
};

margincalc.revenueFromGrossMarginPercentage = function (gmPercentage, cost, precision) {
    var revenue;
    try {
        this.validate({
            grossMargin: gmPercentage,
            cost: cost
        });
    } catch (e) {
        throw new Error(e.message);
    }

    precision = precision || 2;

    revenue = parseFloat(((100 * cost) / (100 - gmPercentage)).toFixed(precision));

    return revenue;
};

module.exports = margincalc;
