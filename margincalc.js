'use strict';

var margincalc = {};

margincalc.validate = function (obj) {
    // returns true if valid

    var EX_PREFIX = 'margin-calc exception: ';

    // throws immediately if obj input is not correct
    if (!obj || typeof obj !== 'object') {
        throw new Error(EX_PREFIX + 'Validation input must be an object.');
    }

    // cost must be passed and must not be undefined, null, or NaN
    if (obj.hasOwnProperty('cost') &&
        (typeof obj.cost === 'undefined' ||
            obj.cost === null ||
            obj.cost.length <= 0 ||
            obj.cost != obj.cost)) {
        throw new Error(EX_PREFIX + 'Cost must be a number.');
    }
    // cost must be > 0
    if (obj.hasOwnProperty('cost') && parseFloat(obj.cost) <= 0) {
        throw new Error(EX_PREFIX + 'Cost entered must be greater than 0.');
    }

    // grossMargin must not be undefined, null, or NaN
    if (obj.hasOwnProperty('grossMargin') &&
        (typeof obj.grossMargin === 'undefined' ||
            obj.grossMargin === null ||
            obj.grossMargin.length <= 0 ||
            obj.grossMargin != obj.grossMargin)) {
        throw new Error(EX_PREFIX + 'Gross margin must be a number.');
    }
    // grossMargin must be < 100%
    if (obj.hasOwnProperty('grossMargin') && parseFloat(obj.grossMargin) >= 100) {
        throw new Error(EX_PREFIX + 'Gross margin entered must be less than 100%.');
    }
    // revenue must not be undefined, null, or NaN
    if (obj.hasOwnProperty('revenue') &&
        (typeof obj.revenue === 'undefined' ||
            obj.revenue === null ||
            obj.revenue.length <= 0 ||
            obj.revenue != obj.revenue)) {
        throw new Error(EX_PREFIX + 'Revenue must be a number.');
    }
    // revenue must be > 0
    if (obj.hasOwnProperty('revenue') && parseFloat(obj.revenue) <= 0) {
        throw new Error(EX_PREFIX + 'Revenue entered must be greater than 0.');
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
