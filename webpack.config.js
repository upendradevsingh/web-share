const webpack = require('webpack');
const path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
	entry: {
		"ws": "./ws.js"
	},
	output: {
		path: path.resolve(__dirname, './'),
		filename: '[name].min.js'
	},
	devtool: "source-map",
	target: 'web',
	plugins: [
		new BabiliPlugin()
	]
};