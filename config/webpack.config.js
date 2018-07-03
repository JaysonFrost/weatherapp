const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const postcssLoader = {
	loader: require.resolve('postcss-loader'),
	options: {
		config: { path: require.resolve('./postcss.config') }
	}
}

const config = {
	entry: path.resolve(__dirname, '../src/index.js'),
	output: {
		path: path.resolve(__dirname, '../public'),
		filename: 'output.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.png'],
		alias: {
			images: path.resolve(__dirname, '../src/assets/images'),
			containers: path.resolve(__dirname, '../src/containers'),
			components: path.resolve(__dirname, '../src/components'),
			stylesheet: path.resolve(__dirname, '../src/assets/stylesheet'),
			fonts: path.resolve(__dirname, '../src/assets/fonts')
		}
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.(css|sss)$/,
			use: ['style-loader',
					{ loader: 'css-loader', options: { modules: true, localIdentName: '[local]' } },
					postcssLoader
				]
					.filter(Boolean)
		}, {
			test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
			loader: require.resolve('url-loader'),
			options: {
				limit: 10000,
				name: `static/media/[name].''}[ext]`
			}
		}, {
			test: /\.(woff|woff2|eot|ttf|svg)$/,
			loader: 'file-loader?name=fonts/[name].[ext]'
		}]
	},
	plugins: [
		new ExtractTextPlugin('styles.css')
	],
	devServer: {
		contentBase: path.resolve(__dirname, '../public'),
		historyApiFallback: true,
		inline: true,
		open: true
	},
	devtool: 'cheap-module-source-map'
}

module.exports = config
