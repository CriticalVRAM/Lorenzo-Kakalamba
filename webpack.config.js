const webpack = require('webpack')
const path = require("path");

module.exports = {
    mode: "production",
    entry: ["@babel/polyfill", "./src/js/jquery.onepagenav.js", "./src/js/svg4everybody.min.js", "./src/js/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-syntax-dynamic-import'
                    ]
                }
            }
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}