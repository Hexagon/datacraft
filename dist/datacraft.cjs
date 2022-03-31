(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DataSet = factory());
})(this, (function () { 'use strict';

	/* clone

	The MIT License (MIT)

	Copyright (c) 2016 Pehr Boman, Hexagon

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	*/

	/**
	 * Clone
	 * 
	 * Recursive function that creates a deep copy of any object
	 * 
	 * @constructor
	 * @param {any} source - Source object
	 * @param {any} [target] - Target object
	 * @param {boolean} [breakCircular] - Replace circular references with string '[Circular]'
	 * @param {trace} [trace] - Used internally for tracing circular references
	 * @returns {any}
	 */
	function clone(source, target, breakCircular, trace) {

		// No need to copy null, undefined or primitive values
		// Shortest way first
		if (       source === null 
	            || source === undefined 
	            || (       source.valueOf() === source 
	                    && source.constructor !== Object 
	                    && !Array.isArray(source)))
			return target = source;
	    
		let seed,
			key,
			prop,
			circularReference;

		// Choose seed for new source.constructor
		//  - Default seed is undefined
		if (!target) {

			// Special case for Date
			if (source.constructor === Date) seed = source.getTime();

			// Everything else, but pure objects and arrays, use themselves as seed
			else if (!(Array.isArray(source) || source.constructor === Object)) seed = source;    

		}
		target = target || new source.constructor(seed);

		// For tracking circular references
		trace = trace || new WeakMap();

		for (key in source) {

			prop = source[key];

			// Check that this is an actual property
			if ( !(key in source) || !Object.prototype.hasOwnProperty.call(source,key) || !Object.getOwnPropertyDescriptor(source, key).writable )
				continue;

			// Circular reference? Store the circular reference and move on to next property
			circularReference = trace.get(prop);
			if ( circularReference ) {
				if ( !breakCircular ) {
					target[key] = circularReference;
					continue;
				} else {
					target[key] = "[Circular]";
					continue;
				}
			}

			// Pure objects and arrays need tracing
			if ( prop !== null &&  prop !== undefined && (Array.isArray(prop) || prop.constructor === Object) ) {
				trace.set(prop, target[key] = Array.isArray(prop) ? Object.assign([], target[key]) : Object.assign({}, target[key]));
			}

			// Ok, this seem to be a simple value, assign it
			target[key] = clone(prop, target[key], breakCircular, trace);

		}

		return target;

	}

	/* ------------------------------------------------------------------------------------

	  DataCraft - MIT License - Hexagon <hexagon@56k.guru>

	  LINQ-like JavaScript object query library. No dependencies. Works in all environments.

	  ------------------------------------------------------------------------------------

	  License:

		Copyright (c) 2022 Hexagon <hexagon@56k.guru>

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

	  ------------------------------------------------------------------------------------  */

	/**
	 * Creates a new DataSet.
	 * @class
	 */
	class DataSet {

		/**
	     * DataSet entrypoint
	     * 
	     * @constructor
	     * @param {Array} [entries] - Optional array of objects, shortcut to `.insert()`
	     * @returns {DataSet}
	     */
		constructor(entries) {

			this.entries = [];

			if (entries) this.insert(entries);

		}

		/* DataSet operations */
		insert(inData) {
			if ( Array.isArray(inData) ) {
				inData.forEach((v) => {
					this.entries.push(v);
				});
			} else {
				throw new TypeError("DataSet: Parameter to insert must be an array.");
			}
		}

		/*update() {
	        ToDo
	    }
	    delete() {
	        ToDo
	    }*/

		drop(fieldName) {
			this.entries.forEach(e => delete e[fieldName]);
			return this;
		}

		/* Relation operations */
		join(oDs, target, conditionCb) {
			// Matches
			this.entries.forEach((localObj) => {
				const matches = [];
				oDs.entries.forEach((remoteObj) => {
					if (conditionCb(localObj, remoteObj)) {
						matches.push(remoteObj);
					}
				});
				localObj[target] = matches;
			});

			return this;
		}
		joinFirst(oDs, target, conditionCb) {
			// Matches
			this.entries.forEach((localObj) => {
				oDs.entries.forEach((remoteObj) => {
					if (conditionCb(localObj, remoteObj)) {
						localObj[target] = remoteObj;
					}
				});
			});

			return this;
		}
		copy() {
			return new DataSet(clone(this.entries));
		}

		/* Filter operations */
		reduce(conditionCb) {
			this.entries = this.filter(conditionCb);
			return this;
		}
		toArray(conditionCb) {
			return conditionCb ? this.entries.filter(conditionCb) : this.entries;
		}
		first(conditionCb) {
			const result = this.filter(conditionCb);
			return ( result.length >= 1 ) ? result[0] : undefined;
		}

		/* Aggregation operations */
		groupBy(groupByFieldsInput, outputFieldName) {
	       
			// Ensure that group groupByFieldsInput is an array
			let groupByFields = Array.isArray(groupByFieldsInput) ? groupByFieldsInput : [groupByFieldsInput],
				outputMap = {},
				output = [];

			this.entries.forEach((localObj) => {
				let currentOutputObj = outputMap;

				groupByFields.forEach(f => {
					let fieldValue = localObj[f] !== undefined ? localObj[f] : "undefined";
					if (currentOutputObj[fieldValue] === undefined) {
						currentOutputObj[fieldValue] = { field: f, value: fieldValue, children: {} };
					}
					currentOutputObj = currentOutputObj[fieldValue].children;
				});
	           
				if (Array.isArray(currentOutputObj[outputFieldName])) {
					currentOutputObj[outputFieldName].push(localObj);
				} else {
					currentOutputObj[outputFieldName] = [localObj];
				}

			});

			const rebuildResults = (currentLevel, trail) => {
				trail = Object.assign({}, trail) || {};
				Object.values(currentLevel).forEach((currentItem) => {
					if (Array.isArray(currentItem)) {
						trail[outputFieldName] = currentItem;
						output.push(trail);
					} else {
						trail[currentItem.field] = currentItem.value;
						rebuildResults(currentItem.children, trail);
					}
				});
			};

			rebuildResults(outputMap);

			return new DataSet(output);

		}    
	   
		/* Aggregation operations */
		total(outputFieldName) {
	       
			let newEntry = {};
			newEntry[outputFieldName] = this.entries;

			return new DataSet([newEntry]);

		}

		avg(field, outputFieldName, mapCb) {
			this.entries.forEach(e => {
				const data = e[field].map(mapCb);
				e[outputFieldName] = data.reduce((a,b) => a + b, 0) / data.length;
			});
			return this;
		}

		sum(field, outputFieldName, mapCb) {
			this.entries.forEach(e => {
				e[outputFieldName] = e[field].map(mapCb).reduce((a,b) => a + b, 0);
			});
			return this;
		}

		min(field, outputFieldName, mapCb) {
			this.entries.forEach(e => {
				e[outputFieldName] = Math.min(...e[field].map(mapCb));
			});
			return this;
		}

		max(field, outputFieldName, mapCb) {
			this.entries.forEach(e => {
				e[outputFieldName] = Math.max(...e[field].map(mapCb));
			});
			return this;
		}


		countd(field, outputFieldName, mapCb) {
			this.entries.forEach(e => {
				const data = e[field].map(mapCb);
				e[outputFieldName] = new Set(data).size;
			});
			return this;
		}

		count(field, outputFieldName, mapCb) {
			this.entries.forEach(e => {
				e[outputFieldName] = e[field].map(mapCb).length;
			});
			return this;
		}

		calc(outputFieldName, calcCb) {
			this.entries.forEach(e => {
				e[outputFieldName] = calcCb(e);
			});
			return this;
		}

		autonumber(outputFieldName) {
			let current = 0;
			this.entries.forEach(e => {
				e[outputFieldName] = current++;
			});
			return this;
		}

	}

	DataSet.DataSet = DataSet;

	return DataSet;

}));
