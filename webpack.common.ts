import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

const config: Configuration = {
  entry: {
    main: './src/index.tsx',
    background: './src/extension/background.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    sourceMapFilename: '[name].map',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  // optimization: {
  //   runtimeChunk: {
  //     name: "manifest",
  //   },
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      chunks: ['main'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json' },
        { from: 'public/1分钟物理套装.epub' },
      ],
    }),
  ],
};

export default config;
