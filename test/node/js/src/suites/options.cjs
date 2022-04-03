let 
	assert = require("uvu/assert")/*,
	timeout = require("../util/timeout.cjs")^*/;

module.exports = function (DataSet, test) {

	test("Passing valid options should not throw", function () {
		assert.not.throws(() => {
			new DataSet({
				allowedFields: ["id", "name"]
			});
		});
	});

	test("Passing invalid options should throw", function () {
		assert.throws(() => {
			new DataSet({
				allowed: ["id", "name"]
			});
		});
	});

};
