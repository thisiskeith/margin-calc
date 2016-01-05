import chai from 'chai';
import margincalc from '../src/margincalc';

const should = chai.should();

describe('grossMarginPercentage', () => {

    it('returns the gross margin percentage with a default precision of 2', () => {
        margincalc.grossMarginPercentage(617, 412).should.equal(33.23);
    });

    it('returns the gross margin percentage with a set precision of 3', () => {
        margincalc.grossMarginPercentage(617, 412, 3).should.equal(33.225);
    });

    it('returns 0 when result in Infinity', () => {
        margincalc.grossMarginPercentage(0, 100).should.equal(0);
    });

    it('returns 0 when revenue and cost are 0', () => {
        margincalc.grossMarginPercentage(0, 0).should.equal(0);
    });

    it('returns 100 when cost is 0', () => {
        margincalc.grossMarginPercentage(100, 0).should.equal(100);
    });
});
