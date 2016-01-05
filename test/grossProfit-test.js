import chai from 'chai';
import margincalc from '../src/margincalc';

const should = chai.should();

describe('grossProfit', () => {

    it('returns a positive profit', () => {
        margincalc.grossProfit(617, 412).should.equal(205);
    });

    it('returns a negative profit', () => {
        margincalc.grossProfit(200, 400).should.equal(-200);
    });

    it('accepts a 0 revenue', () => {
        margincalc.grossProfit(0, 400).should.equal(-400);
    });

    it('accepts a 0 profit', () => {
        margincalc.grossProfit(400, 0).should.equal(400);
    });

    it('accepts a negative revenue', () => {
        margincalc.grossProfit(-400, 300).should.equal(-700);
    });

    it('accepts a negative cost', () => {
        margincalc.grossProfit(400, -300).should.equal(700);
    });

    it('accepts a negative revenue and cost', () => {
        margincalc.grossProfit(-400, -300).should.equal(-100);
    });
});
