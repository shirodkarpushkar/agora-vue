'use strict';
const { resolve, sep, join } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { platformWeb, Utilities, paths } = require('./base.config');
const platform = platformWeb();
const utils = new Utilities(platform);

const config = {
	entry: {
		main: join(paths.app, `main.${platform}.ts`)
	},
	output: {
		path: utils.getPlatformDistributionPath()
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: utils.getLoaders().css
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: utils.getLoaders().scss
			},
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				use: utils.getLoaders().sass
			},
			{
				test: /\.vue$/,
				loader: utils.getLoaders().vue,
				exclude: /node_modules/,
				options: {
					loaders: {
						css: utils.getLoaders().css,
						scss: utils.getLoaders().scss,
						sass: utils.getLoaders().sass
					}
				}
			},
			{
				test: /\.ts?$/,
				loader: utils.getLoaders().ts,
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: utils.getLoaders().files,
				exclude: /node_modules/,
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: utils.getAliases(),
		extensions: utils.getExtensions()
	},
	plugins: [
		new webpack.DefinePlugin(utils.globalVariables()),
		new MiniCssExtractPlugin({
			filename: `app.css`
		}),
		new HtmlWebpackPlugin({
			inject: true,
			filename: 'index.html',
			template: utils.getPlatformResources('index.html'),
			favicon: utils.getPlatformResources('favicon.ico'),
			title: 'Agora moble application',
			files: {
				css: [
					'app.css',
					'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
				]
			},
			meta: {
				viewport: 'width=device-width, initial-scale=1'
			}
		}),
		new VueLoaderPlugin()
	],
	performance: {
		hints: false
	},
	devServer: {
		historyApiFallback: true,
		noInfo: false,
		overlay: true,
		contentBase: './public',
		inline: true
	},
	devtool: '#eval-source-map'
};

utils.report('info', `config for ${platform} is ${JSON.stringify(config)}`);

module.exports = config;
