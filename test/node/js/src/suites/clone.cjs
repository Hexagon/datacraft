/*
Copyright (c) 2016 Hexagon <hexagon@56k.guru>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


let 
	assert = require("uvu/assert")/*,
	timeout = require("../util/timeout.cjs")^*/;

module.exports = function (clone, test) {

	test("Basic usage should not throw", function () {
		assert.not.throws(() => {
			clone({});
		});
	});

	test("Cloning a simple object", function () {
        
		let simpleObject = {
				a: "test",
				b: 1,
				c: 1.2,
				d: [{entry: 1},{entry: 2}],
				e: true,
				f: {
					g: new Date(),
					h: /ag/g
				}
			},
			clonedObject = clone(simpleObject);

		assert.equal(clonedObject.a,"test");
		assert.equal(clonedObject.b,1);
		assert.equal(clonedObject.c,1.2);
		assert.equal(clonedObject.d[1].entry,2);
		assert.equal(clonedObject.e,true);
		assert.equal(clonedObject.f.g.constructor,Date);
		assert.equal(clonedObject.f.h.constructor,RegExp);
        
	});

	/*test("Shallow circular reference", function () {
        
        var simpleObject = {
                a: {
                    b: {

                    }
                }
            },
            clonedObject;

        // Create a circular reference
        simpleObject.a.b = simpleObject.a;

        clonedObject = clone(simpleObject);

        assert.equal(clonedObject.a.b,clonedObject.a);
        assert.not.equal(clonedObject.a.b,simpleObject.a);
        
    });*/

	test("Break shallow circular reference", function () {
        
		let simpleObject = {
				a: {
					b: {

					}
				}
			},
			clonedObject;

		// Create a circular reference
		simpleObject.a.b = simpleObject.a;

		clonedObject = clone(simpleObject, undefined, true);

		assert.equal(clonedObject.a.b,"[Circular]");
        
	});

	/*test("Circular reference", function () {
        
        var simpleObject = {
                a: 1,
                b: {
                    c: {
                        d: {
                            val: 2
                        }
                    }
                },
                d: 3
            },
            clonedObject;

        // Create a circular reference
        simpleObject.b.c.d.e = simpleObject.b;

        clonedObject = clone(simpleObject);

        // Test that the circular reference works
        assert.equal(clonedObject.b.c.d.e,clonedObject.b);

        // Test that the reference to simpleObject is removed
        assert.not.equal(clonedObject.b.c.d.e,simpleObject.b);

        // Test recursion into the circular reference
        assert.equal(clonedObject.b.c.d.e.c.d.val,2);
        
    });*/

	test("Breaking circular reference", function () {
        
		let simpleObject = {
				a: 1,
				b: {
					c: {
						d: {
							val: 2
						}
					}
				},
				d: 3
			},
			clonedObject;

		// Create a circular reference
		simpleObject.b.c.d.e = simpleObject.b;

		clonedObject = clone(simpleObject, undefined, true);

		// Test that the circular reference works
		assert.equal(clonedObject.b.c.d.e,"[Circular]");
        
	});

	test("Plain string", function () {
        
		let 
			simpleObject = "Hello",
			clonedObject;

		clonedObject = clone(simpleObject);

		// Check for equality
		assert.equal(clonedObject,"Hello");

		// Change cloned object, and check that the original didn't change
		clonedObject += "Yo";

		assert.equal(simpleObject,"Hello");
		assert.equal(clonedObject,"HelloYo");

	});

	test("Plain string in object", function () {
        
		let 
			simpleObject = { myString: "Hello" },
			clonedObject;

		clonedObject = clone(simpleObject);

		// Check for equality
		assert.equal(clonedObject.myString,"Hello");

		// Change cloned object, and check that the original didn't change
		clonedObject.myString += "Yo";

		assert.equal(simpleObject.myString,"Hello");
		assert.equal(clonedObject.myString,"HelloYo");

	});

	test("Plain number", function () {
        
		let 
			simpleObject = 42,
			clonedObject;

		clonedObject = clone(simpleObject);

		// Check for equality
		assert.equal(clonedObject,42);

		// Change cloned object, and check that the original didn't change
		clonedObject += 1;

		assert.equal(simpleObject,42);
		assert.equal(clonedObject,43);

	});

	test("Plain number in object", function () {
        
		let 
			simpleObject = { myNumber: 42 },
			clonedObject;

		clonedObject = clone(simpleObject);

		// Check for equality
		assert.equal(clonedObject.myNumber,42);

		// Change cloned object, and check that the original didn't change
		clonedObject.myNumber += 1;

		assert.equal(simpleObject.myNumber,42);
		assert.equal(clonedObject.myNumber,43);

	});

	test("Date", function () {
        
		let 
			simpleObject = new Date(),
			clonedObject;

		simpleObject.setSeconds(0);

		clonedObject = clone(simpleObject);

		// Change cloned object, and check that the original didn't change
		clonedObject.setSeconds(4);

		assert.equal(simpleObject.getSeconds(),0);
		assert.equal(clonedObject.getSeconds(),4);

	});

	test("Array with various objects", function () {
        
		let 
			simpleObject = [new Date(),1,"Hello",{ payload: 4 }, null, NaN, undefined],
			clonedObject;

		simpleObject[0].setSeconds(0);

		clonedObject = clone(simpleObject);

		assert.equal(clonedObject[1],1);
		assert.equal(clonedObject[3].payload,4);
		assert.equal(clonedObject[4], null);
		assert.equal(clonedObject[5],clonedObject[5]); // Check for NaN :)

		clonedObject[0].setSeconds(4);
		clonedObject[1] = 2;
		clonedObject[2] += "Hej";
		clonedObject[3].payload++;

		assert.equal(simpleObject[0].getSeconds(),0);
		assert.equal(simpleObject[1],1);
		assert.equal(simpleObject[2],"Hello");
		assert.equal(simpleObject[3].payload,4);

	});

	/*test("String object with custom property", function () {
        
        var mySuperString = new String("test"),
            clonedSuperString;

        // Woah
        mySuperString.mySubString = "subtest";

        clonedSuperString = clone(mySuperString);
        console.log(clonedSuperString, "test");
        assert.equal(clonedSuperString,"test");
        assert.equal(clonedSuperString.mySubString,"subtest");

        clonedSuperString.mySubString = "subchanged";
        assert.equal(clonedSuperString.mySubString,"subchanged");

        assert.equal(mySuperString,"test");
        
        // ToDo! subobjects of wierd objects (e.g. String, is copied by reference)
        assert.equal(mySuperString.mySubString,"subtest");

    });*/


	test("Number object with custom property (array) with object object with date", function () {
        
		let mySuperNumber = new Number(42),
			clonedSuperNumber;

		// Make mySuperNumber fucked up!
		mySuperNumber.a = [{ d: new Date()}];
		mySuperNumber.a[0].d.setHours(1);
		mySuperNumber.a[0].d.subProp = "Hellu!";

		// Clone
		clonedSuperNumber = clone(mySuperNumber);

		// Change wierd stuff of the cloned instance
		clonedSuperNumber.a[1] = "Added";
		clonedSuperNumber.a[0].d.setHours(2);
		clonedSuperNumber.a[0].d.subProp = "Changed!";

		// Verify everything worked as expected
		assert.equal(mySuperNumber.a[1], undefined);
		assert.equal(clonedSuperNumber.a[1], "Added");

		assert.equal(mySuperNumber.a[0].d.getHours(), 1);
		assert.equal(clonedSuperNumber.a[0].d.getHours(), 2);

		assert.equal(mySuperNumber.a[0].d.subProp, "Hellu!");
		assert.equal(clonedSuperNumber.a[0].d.subProp, "Changed!");

	});

};
