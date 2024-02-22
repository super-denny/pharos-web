module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:7776',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.module.rules.delete('svg')
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: "vue-svg-loader"
                }
            ]
        }
    },
    lintOnSave: false,
}
