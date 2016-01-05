import chai from 'chai';
import margincalc from '../margincalc';

describe('markUpPercentage', () => {

    it('gives you the mark up percentage for supplied revenue and cost', () => {

        margincalc.markUpPercentage(617, 412).should.equal(49.76);
    });
});

describe('markUpPercentage', () => {

    it('gives you the mark up percentage for supplied revenue and cost with a precision of 3', () => {

        margincalc.markUpPercentage(617, 412, 3).should.equal(49.757);
    });
});
