import chai from 'chai';
import margincalc from '../margincalc';

const should = chai.should();

describe('grossMarginPercentage', () => {

    it('gives you the gross margin percentage for supplied revenue and cost', () => {

        margincalc.grossMarginPercentage(617, 412).should.equal(33.23);
    });
});

describe('grossMarginPercentage', () => {

    it('gives you the gross margin percentage for supplied revenue and cost with a precision of 3', () => {

        margincalc.grossMarginPercentage(617, 412, 3).should.equal(33.225);
    });
});
