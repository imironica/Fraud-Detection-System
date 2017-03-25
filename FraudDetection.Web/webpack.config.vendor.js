var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('vendor.css');

module.exports = {
    resolve: {
        extensions: ['', '.js', '.ts'  ]
    },
    module: {
        loaders: [
            { test: /\.(png|jpg|jpeg|jpe?g|gif|svg|woff|woff2|eot|ttf|ico|cur)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=100000' },
            { test: /\.css(\?|$)/, loader: extractCSS.extract(['css']) }
        ]
    },
    entry: {
        vendor: [
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@angular/platform-server',
            'angular2-universal',
            'angular2-universal-polyfills',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.css',
            'es6-shim',
            'es6-promise',
            'jquery',
            'zone.js',
            'font-awesome/css/font-awesome.css',
            'primeng/primeng',
            'primeng/resources/themes/omega/theme.css',
            'primeng/resources/primeng.min.css',
            'admin-lte/dist/css/AdminLTE.min.css',
            'admin-lte/dist/css/skins/skin-red-light.min.css',
            'devextreme/dist/css/dx.common.css',
            'devextreme/dist/css/dx.light.css'
        ]
    },
    output: {
        path: path.join(__dirname, 'wwwroot', 'dist'),
        filename: '[name].js',
        library: '[name]_[hash]',
    },
    plugins: [
        extractCSS,
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
            name: '[name]_[hash]'
        })
    ].concat(isDevBuild ? [] : [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ])
};
