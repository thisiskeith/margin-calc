import chai from 'chai';
import margincalc from '../margincalc';

const should = chai.should();

describe('grossProfit', function () {

    it('gives you the difference between revenue and cost', function () {

        margincalc.grossProfit(617, 412).should.equal(205);
    });
});
