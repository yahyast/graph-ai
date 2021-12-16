// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/graph-ai/' : '/',
    chainWebpack: (config) => {
        config.module.rules.delete('eslint');
        config.optimization.minimizer('terser').tap((args) => {
            const opts = args[0];

            opts.terserOptions.mangle = {
                ...opts.terserOptions.mangle,
                properties: true, // mangle all property names
            };

            return args;
        });
    },
    configureWebpack: {
        plugins: [
            // new BundleAnalyzerPlugin(),
            new CompressionPlugin({
                filename: '[path][base].br',
                algorithm: 'brotliCompress',
                test: /\.js$/,
            }),
        ],
        performance: {
            hints: false,
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            },
        },
    },
    devServer: {
        https: false,
        disableHostCheck: true,
        before(app) {
            app.use('*.js', (req, res, next) => {
                if (req.get('Accept-Encoding').includes('br')) {
                    req.url += '.br';

                    res.set('Content-Encoding', 'br');
                    res.set('Content-Type', 'application/javascript; charset=utf-8');
                }
                next();
            });
        },
    },
    css: {
        loaderOptions: {
            sass: {
                // additionalData: `@import "~@/assets/sass/app.sass"`
            },
        },
    },
};
