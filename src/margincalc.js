'use strict';

class MarginCalc {

    /**
     * Get gross margin percentage from revenue anc cost. Optionally provide the
     * number of precision units (defaults to 2)
     *
     * @return {number} Gross margin percentage
     */
    static grossMarginPercentage (revenue, cost, precision = 2) {

        const spec = {
                cost: { check: 'isFinite' },
                revenue: { check: 'isFinite' },
            };

        try {
            MarginCalc.validate(spec, { revenue, cost });
        } catch (e) {
            throw new Error(e.message);
        }

        const grossProfit = MarginCalc.grossProfit(revenue, cost);
        let grossMargin = parseFloat((grossProfit / revenue * 100)
            .toFixed(precision));

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
    static grossProfit (revenue, cost) {

        const spec = {
                cost: { check: 'isFinite' },
                revenue: { check: 'isFinite' },
            };

        try {
            MarginCalc.validate(spec, { revenue, cost });
        } catch (e) {
            throw new Error(e.message);
        }

        const profit = revenue - cost;

        return profit;
    }

    /**
     * Get mark up percentage from revenue and cost. Optionally provide the
     * number of precision units (defaults to 2)
     *
     * @return {undefined}
     */
    static markUpPercentage (revenue, cost, precision = 2) {

        const spec = {
                cost: { check: 'isFinite' },
                revenue: { check: 'isFinite' },
            };

        try {
            MarginCalc.validate(spec, { revenue, cost });
        } catch (e) {
            throw new Error(e.message);
        }

        const grossProfit = MarginCalc.grossProfit(revenue, cost);
        let markUp = parseFloat(((grossProfit / cost) * 100)
            .toFixed(precision));

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
    static revenueFromGrossMarginPercentage (percentage, cost, precision = 2) {

        const spec = {
                cost: { check: 'zeroOrGreater' },
                percentage: { check: 'zeroOrGreater' },
            };

        try {
            MarginCalc.validate(spec, { percentage, cost });
        } catch (e) {
            throw new Error(e.message);
        }

        const revenue = parseFloat(((100 * cost) / (100 - percentage))
            .toFixed(precision));

        return revenue;
    }

    /**
     * Global validation helper. Supports regex pattern and boolean function
     * validation specs
     *
     * @return {bool} Valid
     */
    static validate (spec, subject) {

        let i;
        let valid = true;

        for (i in spec) {

            const currentSpec = spec[i];
            const { check, pattern } = currentSpec;

            if (pattern) {

                const result = MarginCalc.tests[pattern].test(subject[i]);

                if (!result) {
                    valid = false;
                    break;
                }

            } else if (check && typeof MarginCalc.tests[check] === 'function') {

                const result = MarginCalc.tests[check](subject[i]);

                if (!result) {
                    valid = false;
                    break;
                }
            }
        }

        return valid;
    }
}

MarginCalc.tests = {
    isFinite: (value) => typeof value === "number" && isFinite(value),
    zeroOrGreater: (value) => value > -1,
};

export default MarginCalc;
