const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Main Application', // Customize titles based on entry points
        chunks: ['main'], // Specify chunks to include in the HTML file
      }),
      new HtmlWebpackPlugin({
        template: './install.html',
        title: 'Install Page',
        chunks: ['install'],
      }),
      new HtmlWebpackPlugin({
        template: './cards.html',
        title: 'Contact Cards',
        chunks: ['cards'],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js', // Correct destination for service worker
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'My PWA',
        short_name: 'PWA',
        description: 'My Progressive Web App',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
