module.exports = function (DataSet, clone) {
	const test = require("uvu").test;

	require("./suites/basics.cjs")(DataSet, test);
	if (clone) require("./suites/clone.cjs")(clone, test);
	
	test.run();
};