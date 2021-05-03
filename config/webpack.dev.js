const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        main: ['babel-polyfill', './src/main.js'],
    },
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../public'),
        publicPath: '/',
    },
    devServer: {
        inline: false,
        contentBase: 'public',
        overlay: true,
        hot: true,
        stats: {
            colors: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].html',
                        },
                    },
                    {
                        loader: 'extract-loader',
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src'],
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(pug)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'views/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new ESLintPlugin({
        }),
    ],
};
