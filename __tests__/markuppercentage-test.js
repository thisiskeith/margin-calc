jest.dontMock('../margincalc');

describe('markUpPercentage', function () {

    it('gives you the mark up percentage for supplied revenue and cost', function () {

        var margincalc = require('../margincalc');

        expect(margincalc.markUpPercentage(617, 412)).toEqual(49.76);
    });
});

describe('markUpPercentage', function () {

    it('gives you the mark up percentage for supplied revenue and cost with a precision of 3', function () {

        var margincalc = require('../margincalc');

        expect(margincalc.markUpPercentage(617, 412, 3)).toEqual(49.757);
    });
});
