import chai from 'chai';
import margincalc from '../src/margincalc';

const should = chai.should();

describe('markUpPercentage', () => {

    it('returns the mark up percentage with a default precision of 2', () => {
        margincalc.markUpPercentage(617, 412).should.equal(49.76);
    });

    it('returns the mark up percentage with a set precision of 3', () => {
        margincalc.markUpPercentage(617, 412, 3).should.equal(49.757);
    });

    it('returns 0 when result is Infinity', () => {
        margincalc.markUpPercentage(617, 0).should.equal(0);
    });

    it('returns -100 when revenue is 0', () => {
        margincalc.markUpPercentage(0, 412).should.equal(-100);
    });

    it('returns 0 when revenue and cost are 0', () => {
        margincalc.markUpPercentage(0, 0).should.equal(0);
    });
});
