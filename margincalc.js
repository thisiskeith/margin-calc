'use strict';

var margincalc = {};

margincalc.grossProfit = function (revenue, cost) {
    return revenue - cost;
};

margincalc.grossMarginPercentage = function (revenue, cost, precision) {

    precision = precision || 2;

    var p = this.grossProfit(revenue, cost);
    var g = parseFloat((p / revenue * 100).toFixed(precision));

    return g;
};

margincalc.markUpPercentage = function (revenue, cost, precision) {

    precision = precision || 2;

    var p = this.grossProfit(revenue, cost);
    var m = parseFloat(((p / cost) * 100).toFixed(precision));

    return m;
};

module.exports = margincalc;
