const path = require('path');

module.exports = {
	entry: './src/media/script.js', // Update with your actual entry file
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'), // Output directory, adjust as needed
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
