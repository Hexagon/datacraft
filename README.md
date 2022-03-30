# Datacraft

LINQ-like JavaScript object query library. No dependencies. Works in all environments.

![Node.js CI](https://github.com/Hexagon/datacraft/workflows/Node.js%20CI/badge.svg?branch=master) [![npm version](https://badge.fury.io/js/datacraft.svg)](https://badge.fury.io/js/datacraft) 
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
import DataSet from "https://cdn.jsdelivr.net/gh/hexagon/datacraft@4/src/datacraft.js";

const data = new DataSet();
```

TypeScript

```typescript
import { DataSet } from "https://cdn.jsdelivr.net/gh/hexagon/datacraft@1/src/datacraft.js";

const _data : DataSet = new DataSet();
```

### Browser 

#### Manual

*   Download latest [zipball](https://github.com/Hexagon/datacraft/archive/refs/heads/master.zip)
*   Unpack
*   Grab ```datacraft.min.js``` (UMD and standalone) or ```datacraft.min.mjs``` (ES-module) from the [dist/](/dist) folder

#### CDN

To use as a [UMD](https://github.com/umdjs/umd)-module (stand alone, [RequireJS](https://requirejs.org/) etc.)

```html
<script src="https://cdn.jsdelivr.net/npm/datacraft@1/dist/datacraft.min.js"></script>
```

To use as a [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```html
<script type="module">
	import DataSet from "https://cdn.jsdelivr.net/npm/datacraft@1/dist/datacraft.min.mjs";

	// ... see usage section ...
</script>
```
## Documentation

Full documentation available at [hexagon.github.io/datacraft](https://hexagon.github.io/datacraft/DataSet.html).

The short version:

### Signature

## Examples

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT
