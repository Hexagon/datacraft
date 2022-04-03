let 
	assert = require("uvu/assert")/*,
	timeout = require("../util/timeout.cjs")^*/;

module.exports = function (validate, test) {

	const testObj = {
		foo: "bar",
		bar: "baz",
		baz: 0,
		func: () => {}
	};

	test("Valid validation should not throw", function () {
		assert.not.throws(() => {
			let result = validate(testObj, ["foo","bar","baz","func"]);
			assert.equal(result, true);
		});
	});

	test("Non allowed field should throw", function () {
		assert.throws(() => {
			validate(testObj, ["foo","bar","baz"]);
		});
	});

	test("All required fields should not throw", function () {
		assert.not.throws(() => {
			validate(testObj, ["foo","bar","baz","func"], ["func"]);
		});
	});
    
	test("Missing required fields should throw", function () {
		assert.throws(() => {
			validate(testObj, ["foo","bar","baz","func","missing"], ["missing"]);
		});
	});

};
