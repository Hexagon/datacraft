let 
	assert = require("uvu/assert")/*,
	timeout = require("../util/timeout.cjs")^*/;

module.exports = function (DataSet, test) {

	test("new DataSet(...) should not throw", function () {
		assert.not.throws(() => {
			new DataSet();
		});
	});

};
