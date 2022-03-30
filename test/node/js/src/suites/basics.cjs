let 
	assert = require("uvu/assert")/*,
	timeout = require("../util/timeout.cjs")^*/;

module.exports = function (DataSet, test) {

	test("new DataSet() should not throw", function () {
		assert.not.throws(() => {
			new DataSet();
		});
	});

	test("new DataSet(...) should accept an array, and insert each array entry", function () {
		let ds = new DataSet([
			{ a: "yes", b: 0},
			{ a: "no", b: 1}
		]);
		assert.equal(ds.toArray().length, 2);
	});

};
