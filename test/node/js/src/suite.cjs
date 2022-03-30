module.exports = function (DataSet) {
	const test = require("uvu").test;

	require("./suites/basics.cjs")(DataSet, test);

	test.run();
};