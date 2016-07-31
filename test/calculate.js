var chai = require('chai');
var expect = chai.expect;
chai.config.includeStack = false;
var BigNumber = require("../src/infimath.js");

var tests = [
	// Each test is run as BigNumber(a)[b](c) === {data: d, decs: e, sign: f}
	// [a, b, [c], d, e, f]

	/************ Plus tests ************/
	
	// 0 + any
	[    "0", "plus", [    0], [   0],  0,  0],
	[    "0", "plus", [    1], [   1],  0,  1],
	[    "0", "plus", [   -1], [   1],  0, -1],
	[    "1", "plus", [    0], [   1],  0,  1],
	[   "-1", "plus", [    0], [   1],  0, -1],
	
	// pos + pos
	[    "1", "plus", [    1], [   2],  0,  1],
	[    "1", "plus", [  999], [   1], -1,  1],
	[    "1", "plus", [ 1000], [1, 1],  0,  1],
	[  "999", "plus", [    1], [   1], -1,  1],
	[ "1000", "plus", [    1], [1, 1],  0,  1],
	
	// pos + neg
	[    "1", "plus", [   -1], [   0],  0,  0],
	[    "1", "plus", [   -2], [   1],  0, -1],
	[    "1", "plus", [-1001], [   1], -1, -1],
	[    "1", "plus", [-1002], [1, 1],  0, -1],
	[    "1", "plus", [-1003], [2, 1],  0, -1],
	[    "1", "plus", [-1000001], [1], -2, -1],
	[    "1", "plus", [-1000002], [1, 0, 1],  0, -1],
	["1000001", "plus", [-1], [   1], -2,  1],
	["1000002", "plus", [-1], [1, 0, 1],  0,  1],
	
	// neg + pos
	[   "-1", "plus", [    1], [   0],  0,  0],
	[   "-1", "plus", [    2], [   1],  0,  1],
	[   "-1", "plus", [ 1001], [   1], -1,  1],
	[   "-1", "plus", [ 1002], [1, 1],  0,  1],
	[   "-1", "plus", [ 1003], [2, 1],  0,  1],
	[   "-1", "plus", [1000001], [1],  -2,  1],
	[   "-1", "plus", [1000002], [1, 0, 1],  0,  1],
	["-1000001", "plus", [1], [   1], -2, -1],
	["-1000002", "plus", [1], [1, 0, 1],  0, -1],
	
	// neg + neg
	[   "-1", "plus", [   -1], [   2],  0, -1],
	[   "-1", "plus", [ -999], [   1], -1, -1],
	[   "-1", "plus", [-1000], [1, 1],  0, -1],
	
	// dec + dec
	[    "1", "plus", [  1.1], [100, 2],  1,  1],
	[  "1.1", "plus", [    1], [100, 2],  1,  1],
	[  "1.1", "plus", [  1.1], [200, 2],  1,  1],
	[ "7.86", "plus", [  2.4], [260,10],  1,  1],
	[  "0.1", "plus", [999.9], [     1], -1,  1],
	["999.9", "plus", [  0.1], [     1], -1,  1],
	
	
	/************ Minus tests ************/
	
	// 0 - any or any - 0
	[   "0", "minus", [    0], [   0],  0,  0],
	[   "0", "minus", [    1], [   1],  0, -1],
	[   "0", "minus", [   -1], [   1],  0,  1],
	[   "1", "minus", [    0], [   1],  0,  1],
	[  "-1", "minus", [    0], [   1],  0, -1],
	
	// pos - pos
	[   "1", "minus", [    1], [   0],  0,  0],
	[   "1", "minus", [    2], [   1],  0, -1],
	[   "1", "minus", [ 1001], [   1], -1, -1],
	[   "1", "minus", [ 1002], [1, 1],  0, -1],
	["1001", "minus", [    1], [   1], -1,  1],
	["1002", "minus", [    1], [1, 1],  0,  1],
	
	// pos - neg
	[   "1", "minus", [   -1], [   2],  0,  1],
	[   "1", "minus", [ -999], [   1], -1,  1],
	[   "1", "minus", [-1000], [1, 1],  0,  1],
	[   "1", "minus", [ -999999], [1], -2,  1],
	[   "1", "minus", [-1000000], [1, 0, 1],  0,  1],
	[ "999999", "minus", [-1], [   1], -2,  1],
	["1000000", "minus", [-1], [1, 0, 1],  0,  1],
	
	// neg - pos
	[  "-1", "minus", [    1], [   2],  0,  -1],
	[  "-1", "minus", [  999], [   1], -1,  -1],
	[  "-1", "minus", [ 1000], [1, 1],  0,  -1],
	[  "-1", "minus", [ 999999], [1], -2,  -1],
	[  "-1", "minus", [1000000], [1, 0, 1],  0,  -1],
	[ "-999999", "minus", [1], [   1], -2,  -1],
	["-1000000", "minus", [1], [1, 0, 1],  0,  -1],
	
	// neg - neg
	[   "-1", "minus", [   -1], [   0],  0,  0],
	[   "-1", "minus", [   -2], [   1],  0,  1],
	[   "-1", "minus", [-1001], [   1], -1,  1],
	[   "-1", "minus", [-1002], [1, 1],  0,  1],
	["-1000", "minus", [   -1], [ 999],  0, -1],
	["-1001", "minus", [   -1], [   1], -1, -1],
	
	// dec - dec
	[     "1", "minus", [  1.1], [   100],  1, -1],
	[   "1.1", "minus", [    1], [   100],  1,  1],
	[   "1.1", "minus", [  1.1], [     0],  0,  0],
	[  "7.86", "minus", [  2.4], [460, 5],  1,  1],
	[  "-0.1", "minus", [999.9], [     1], -1, -1],
	["-999.9", "minus", [  0.1], [     1], -1, -1],
];

tests.forEach(function(test) {
	describe('BigNumber("' + test[0] + '").' + test[1] + '(' + test[2].join(", ") + ').calculate()', function() {
		var a = BigNumber.prototype[test[1]].apply(BigNumber(test[0]), test[2]).calculate();
		it('should have data of [' + test[3] + ']', function() {
			expect(a.data + '').to.equal(test[3] + '');
		});
		it('should have decs of ' + test[4], function() {
			expect(a.decs).to.equal(test[4]);
		});
		it('should have sign of ' + test[5], function() {
			expect(a.sign).to.equal(test[5]);
		});
	});
});