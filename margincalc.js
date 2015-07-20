'use strict';

var margincalc = {};

function validate(obj) {
    // returns validation result object
    var result = {
        valid: true,
        message: ''
    };

    // throws immediately if obj input is not correct
    if (!obj) {
        throw 'margin-calc exception: No validation data received.';
    }
    if (typeof obj !== 'object') {
        throw 'margin-calc exception: Validation input must be an object.';
    }

    // grossMargin must be < 100%
    if (obj.grossMargin && parseFloat(obj.grossMargin) >= 100) {
        result.valid = false;
        result.message += 'margin-calc exception: Gross margin entered must be less than 100%. ';
    }
    // revenue and cost must be > 0
    if (obj.cost && parseFloat(obj.cost) <= 0) {
        result.valid = false;
        result.message += 'margin-calc exception: Cost entered must be greater than 0. ';
    }
    if (obj.revenue && parseFloat(obj.revenue) <= 0) {
        result.valid = false;
        result.message += 'margin-calc exception: Revenue entered must be greater than 0.';
    }

    return result;
}

margincalc.grossProfit = function (revenue, cost) {
    try {
        var testData = validate({
            revenue: revenue,
            cost: cost
        });
    } catch (e) {
        if (console && console.error) {
            console.error(e);
        }
    }

    if (!testData.valid && testData.message) {
        throw testData.message;
    }
    return revenue - cost;
};

margincalc.grossMarginPercentage = function (revenue, cost, precision) {
    try {
        var testData = validate({
            revenue: revenue,
            cost: cost
        });
    } catch (e) {
        if (console && console.error) {
            console.error(e);
        }
    }

    if (!testData.valid && testData.message) {
        throw testData.message;
    }
    precision = precision || 2;

    var p = this.grossProfit(revenue, cost);
    var g = parseFloat((p / revenue * 100).toFixed(precision));

    return g;
};

margincalc.markUpPercentage = function (revenue, cost, precision) {
    try {
        var testData = validate({
            revenue: revenue,
            cost: cost
        });
    } catch (e) {
        if (console && console.error) {
            console.error(e);
        }
    }

    if (!testData.valid && testData.message) {
        throw testData.message;
    }

    precision = precision || 2;

    var p = this.grossProfit(revenue, cost);
    var m = parseFloat(((p / cost) * 100).toFixed(precision));

    return m;
};

margincalc.revenueFromGrossMarginPercentage = function (gmPercentage, cost, precision) {
    try {
        var testData = validate({
            grossMargin: gmPercentage,
            cost: cost
        });
    } catch (e) {
        if (console && console.error) {
            console.error(e);
        }
    }

    if (!testData.valid && testData.message) {
        throw testData.message;
    }

    precision = precision || 2;

    var revenue = parseFloat(((100 * cost) / (100 - gmPercentage)).toFixed(precision));

    return revenue;
};

module.exports = margincalc;
