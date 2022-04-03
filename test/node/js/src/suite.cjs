module.exports = function (DataSet, clone, validate) {
	const test = require("uvu").test;

	require("./suites/basics.cjs")(DataSet, test);
	if (clone) require("./suites/clone.cjs")(clone, test);
	if (validate) require("./suites/validate.cjs")(validate, test);
	
	test.run();
};