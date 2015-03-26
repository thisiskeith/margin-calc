jest.dontMock('../margincalc');

describe('grossProfit', function () {

    it('gives you the difference between revenue and cost', function () {

        var margincalc = require('../margincalc');

        expect(margincalc.grossProfit(617, 412)).toEqual(205);
    });
});
