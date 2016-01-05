import chai from 'chai';
import margincalc from '../src/margincalc';

const should = chai.should();

describe('revenueFromGrossMarginPercentage', () => {

    it('returns revenue from gross margin percentage and cost', () => {
        margincalc.revenueFromGrossMarginPercentage(80, 200).should.equal(1000);
    });

    it('returns 200 when cost is 200 and markup percentage is 0', () => {
        margincalc.revenueFromGrossMarginPercentage(0, 200).should.equal(200);
    });

    it('returns 0 when cost is 0', () => {
        margincalc.revenueFromGrossMarginPercentage(80, 0).should.equal(0);
    });

    it('accepts a negative markup percentage', () => {
        margincalc.revenueFromGrossMarginPercentage(-80, 200).should.equal(111.11);
    });

    it('accepts a negative cost', () => {
        margincalc.revenueFromGrossMarginPercentage(80, -200).should.equal(-1000);
    });
});
