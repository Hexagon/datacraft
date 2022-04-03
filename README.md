# Datacraft

LINQ-like JavaScript object query library. No dependencies. Works in all environments.

*Work in progress*, stay tuned for the upcoming `1.0`.

![Node.js CI](https://github.com/Hexagon/datacraft/workflows/Node.js%20CI/badge.svg?branch=main) ![Deno CI](https://github.com/Hexagon/datacraft/workflows/Deno%20CI/badge.svg?branch=main) [![npm version](https://badge.fury.io/js/datacraft.svg)](https://badge.fury.io/js/datacraft) 
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/datacraft/blob/main/LICENSE) [![NPM Downloads](https://img.shields.io/npm/dw/datacraft.svg)](https://www.npmjs.org/package/datacraft)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

*   Works in Node.js >=4.0 (both require and import).
*   Works in Deno >=1.16.
*   Works in browsers as standalone, UMD or ES-module.
*   Includes [TypeScript](https://www.typescriptlang.org/) typings.

Quick examples:

```javascript

```

More [examples](#examples)...

## Installation

### Node.js

```npm install datacraft --save```

JavaScript

```javascript
// ESM Import ...
import DataSet from "datacraft";

// ... or CommonJS Require
const DataSet = require("datacraft");
```

TypeScript

Notes for TypeScript:

```typescript
import DataSet from "datacraft";

const data : DataSet = new DataSet();
```

### Deno

JavaScript

```javascript
import DataSet from "https://deno.land/x/datacraft/src/datacraft.js";

const data = new DataSet();
```

TypeScript

```typescript
import { DataSet } from "https://deno.land/x/datacraft/src/datacraft.js";

const _data : DataSet = new DataSet();
```

### Browser 

#### Manual

*   Download latest [zipball](https://github.com/Hexagon/datacraft/archive/refs/heads/main.zip)
*   Unpack
*   Grab ```datacraft.min.js``` (UMD and standalone) or ```datacraft.min.mjs``` (ES-module) from the [dist/](/dist) folder

#### CDN

To use as a [UMD](https://github.com/umdjs/umd)-module (stand alone, [RequireJS](https://requirejs.org/) etc.)

```html
<script src="https://cdn.jsdelivr.net/npm/datacraft@0/dist/datacraft.min.js"></script>
```

To use as a [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```html
<script type="module">
	import DataSet from "https://cdn.jsdelivr.net/npm/datacraft@0/dist/datacraft.min.mjs";

	// ... see usage section ...
</script>
```
## Documentation

Full documentation available at [hexagon.github.io/datacraft](https://hexagon.github.io/datacraft/DataSet.html).

The short version:

### Examples

```javascript
// Node 
// import { DataSet } from "datacraft";

// Deno
import DataSet from "https://deno.land/x/datacraft/src/datacraft.js";


// Set up data
let persons = new DataSet([
	{name: "Curt", group: 14, age: 34},
	{name: "Lewis", group: 14, age: 38},
	{name: "Stewie", group: 15, age: 31}
]);

let groups = new DataSet([
	{group: 14, name: "Western"},
	{group: 15, name: "North"}
]);

// Set up relations
let personsWithFirstGroup = persons.copy().joinFirst(groups, "groups", (p, g) => p.group == g.group);
let groupsWithAllPersons = groups.copy().join(persons, "persons", (g, p) => g.group == p.group);

// Aggregate data
groupsWithAllPersons
	.avg("persons", "averageAge", p => p.age)
	.min("persons", "maxAge", p => p.age)
	.max("persons", "minAge", p => p.age)
	.count("persons", "personCount", p => p.name);

// Print data
console.log(personsWithFirstGroup.toArray());
console.log(groupsWithAllPersons.toArray());
```

### All methods

All methods of `DataSet`.

#### Dataset operations

| Method | Description |
| ------ | ----------- |
| insert([obj1, obj2]) | Insert new objects into data set |
| drop(fieldName) | Remove a field from all objects in data set |
| copy() | Make a shallow copy of current data set |
| calc(outputFieldName, calcCb) | Creates a new field, containing the return value of calcCb |
| autonumber(outputFieldName) | Creates a new field, contaning a number that increment for each entry |

#### Relations

| Method | Description |
| ------ | ----------- |
| join(otherDataSet, newFieldName, conditionCb) | Join all objects in data set with objects of another data set where conditionsCb return true |
| joinFirst(otherDataSet, newFieldName, conditionCb) | Join first object from otherDataSet with objects in current data set |

#### Filtering

| Method | Description |
| ------ | ----------- |
| filter(conditionCb) | Keep only objects matching conditionCb |
| toArray(conditionCb) | Returns an array of all entries in current data set, optionally filtered by conditionCb |
| first(conditionCb) | Returns the first entry if current data set, optionally filtered by conditionCb |

#### Aggregation

| Method | Description |
| ------ | ----------- |
| groupBy(groupByFieldsInput, outputFieldName) | Group current dataset by field(s) specified by `groupByFieldsInput` |
| total(outputFieldName) | Group current dataset, placing all entries in a new field named by parameter `outputFieldName` |
| avg(field, outputFieldName, mapCb) | Average a value from entries in field specified by `field`, in a new field named by `outputFieldName`. mapCb points out which subfield should be averaged |
| sum(field, outputFieldName, mapCb) | Like above |
| min(field, outputFieldName, mapCb) | Like above |
| max(field, outputFieldName, mapCb) | Like above |
| countd(field, outputFieldName, mapCb) | Like above |
| count(field, outputFieldName, mapCb) | Like above |

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT
