const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
    mode: 'none',
    target: 'node',
    entry: './src/extension.ts',
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'extension.js',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        // Добавляем алиас для основной части
        alias: {
            common: path.resolve(__dirname, 'common/')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            }
        ]
    },
    externals: {
        vscode: 'commonjs vscode'
    }
};

/** @type {import('webpack').Configuration} */
const webviewConfig = {
    mode: 'none',
    target: 'web',
    entry: './webview/src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'out/webview'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // КРИТИЧЕСКИ ВАЖНО: Алиас для Webview
        alias: {
            common: path.resolve(__dirname, 'common/')
        },
        fallback: {
            "path": false // Чтобы Webpack не ругался на отсутствие node-модулей в браузере
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'webview/tsconfig.json'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};

module.exports = [config, webviewConfig];
