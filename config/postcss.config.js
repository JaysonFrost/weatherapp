const autoprefixer = require('autoprefixer')
const postcss = require('postcss-nested')

module.exports = ({ file }) => ({
	loader: require.resolve('postcss-loader'),
	parser: file.extname === '.sss' ? 'sugarss' : false,
	plugins: [
		postcss,
		autoprefixer({
			browsers: [
				'>1%',
				'last 4 versions',
				'Firefox ESR',
				'not ie < 9'
			],
			flexbox: 'no-2009'
		})
	]
})
