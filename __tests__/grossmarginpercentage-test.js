jest.dontMock('../margincalc');

describe('grossMarginPercentage', function () {

    it('gives you the gross margin percentage for supplied revenue and cost', function () {

        var margincalc = require('../margincalc');

        expect(margincalc.grossMarginPercentage(617, 412)).toEqual(33.23);
    });
});

describe('grossMarginPercentage', function () {

    it('gives you the gross margin percentage for supplied revenue and cost with a precision of 3', function () {

        var margincalc = require('../margincalc');

        expect(margincalc.grossMarginPercentage(617, 412, 3)).toEqual(33.225);
    });
});
