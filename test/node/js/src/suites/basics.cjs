let 
	assert = require("uvu/assert")/*,
	timeout = require("../util/timeout.cjs")^*/;

module.exports = function (DataSet, test) {

	test("new DataSet() should not throw", function () {
		assert.not.throws(() => {
			new DataSet();
		});
	});

	test(".insert() should return itself, accept an array, and insert each array entry, and return self", function () {
		let ds = new DataSet(),
			result = ds.insert([
				{ a: "yes", b: 0},
				{ a: "no", b: 1}
			]);
		assert.equal(ds.toArray().length, 2);
		assert.equal(ds, result);
	});

	test(".insert() allowed fields should not throw", function () {
		assert.not.throws(() => {
			new DataSet({allowedFields: ["a","b"]}).insert([
				{ a: "yes", b: 0},
				{ a: "no", b: 1}
			]);
		});
	});

	test(".insert() disallowed fields should throw", function () {
		assert.throws(() => {
			new DataSet({allowedFields: ["a","c"]}).insert([
				{ a: "yes", b: 0},
				{ a: "no", b: 1}
			]);
		});
	});

	test(".insert() required fields should not throw", function () {
		assert.not.throws(() => {
			new DataSet({requiredFields: ["a","b"]}).insert([
				{ a: "yes", b: 0},
				{ a: "no", b: 1}
			]);
		});
	});

	test(".insert() missing required fields should throw", function () {
		assert.throws(() => {
			let ds = new DataSet({requiredFields: ["a","c"]});
			ds.insert([
				{ a: "yes", b: 0},
				{ a: "no", b: 1}
			]);
		});
	});

	test(".update() should update correct entry", function () {
		let ds = new DataSet();
		ds.insert([
			{ a: "yes", b: 0},
			{ a: "no", b: 1},
			{ a: "foo", b: 2}
		]);
		ds.update({a:"wat"}, (e) => e.b === 1);
		assert.equal(ds.toArray(e=>e.b === 0)[0].a,"yes");
		assert.equal(ds.toArray(e=>e.b === 1)[0].a,"wat");
		assert.equal(ds.toArray(e=>e.b === 2)[0].a,"foo");
	});

	test(".update() many fields should work", function () {
		let ds = new DataSet();
		ds.insert([
			{ a: "yes", b: 0, c: 4},
			{ a: "no", b: 1, c: 5},
			{ a: "foo", b: 2, c: 6}
		]);
		ds.update({a:"wat",c: 7}, (e) => e.b === 1);
		assert.equal(ds.toArray(e=>e.b === 1)[0].a,"wat");
		assert.equal(ds.toArray(e=>e.b === 1)[0].c,7);
	});

	test(".update() with fields other then allowed should throw", function () {
		assert.throws(() => {
			let ds = new DataSet({ allowedFields: ["a","b","c"]});
			ds.insert([
				{ a: "yes", b: 0, c: 4},
				{ a: "no", b: 1, c: 5},
				{ a: "foo", b: 2, c: 6}
			]);
			ds.update({a:"wat",d: 7}, (e) => e.b === 1);
		});
	});

};
