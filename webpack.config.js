const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: './src/main.jsx',
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'main.js',
	},
	devtool: isDev ? "source-map" : false,
	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		hot: true,
		compress: true,
		port: 9001,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader:'babel-loader',
			},
			{
				test: /\.styl$/,
				exclude: /node_modules/,
				loaders:[
					'style-loader',
					'css-loader?modules',
					'stylus-loader',
				],
			},
		]
	},
	resolve: {
		extensions: ['.jsx', '.js', '.styl'],
	},
}