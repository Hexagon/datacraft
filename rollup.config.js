export default [
	{
		input: "./src/datacraft.single.js",
		output: {
			file: "dist/datacraft.cjs",
			format: "umd",
			name: "DataSet",
			exports: "default"
		}
	},
	{	
		input: "./src/datacraft.js",
		output: {
			file: "dist/datacraft.mjs",
			format: "es"
		}
	}
];