'use strict';

var margincalc = {};

margincalc.validate = function (obj) {
    // returns true if valid

    var EX_PREFIX = 'margin-calc exception: ';

    // throws immediately if obj input is not correct
    if (!obj || typeof obj !== 'object') {
        throw new Error(EX_PREFIX + 'Validation input must be an object.');
    }

    var config = [
        {name: 'cost', rule: 1, label: 'Cost'},
        {name: 'revenue', rule: 1, label: 'Revenue'},
        {name: 'grossMargin', rule: 2, label: 'Gross margin'}];

    var i,
        l = config.length;

    for (i = 0; i < l; i ++) {
        if (obj.hasOwnProperty(config[i].name)) {
            // property passed and must not be undefined, null, or NaN
            if (typeof obj[config[i].name] === 'undefined' ||
                 obj[config[i].name] === null ||
                 obj[config[i].name].length <= 0 ||
                 obj[config[i].name] != obj[config[i].name]) {
                throw new Error(EX_PREFIX + config[i].label + ' must be a number.');
            }
            if (config[i].rule === 1) {
                // cost or revenue must be > 0
                if (parseFloat(obj[config[i].name]) <= 0) {
                    throw new Error(EX_PREFIX + config[i].label + ' entered must be greater than 0.');
                }
            }
            if (config[i].rule === 2) {
                // gross margin must be < 100%
                if (parseFloat(obj[config[i].name]) >= 100) {
                    throw new Error(EX_PREFIX + config[i].label + ' entered must be less than 100%.');
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
