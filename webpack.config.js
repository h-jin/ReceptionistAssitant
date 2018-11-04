const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      /*{
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }*/
    ]
  },
  performance: { hints: false },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/react-icon.png'
    })
  ],
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/client/utils'),
      reducers: path.resolve(__dirname, 'src/client/reducers'),
      sagas: path.resolve(__dirname, 'src/client/sagas'),
      store: path.resolve(__dirname, 'src/client/store'),
      components: path.resolve(__dirname, 'src/client/components'),
      connectors: path.resolve(__dirname, 'src/client/connectors')
    }
  }
};


/*const webpackConfig = {
  name: "client",
  target: "web",

  entry: {
    app: path.resolve("src/client/index.js")
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  performance: { hints: false },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ],

  output: {
    path: path.resolve(outputDirectory),
    // path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [path.resolve("src"), "node_modules"],
    extensions: [".js", ".jsx"],
    alias: {
      utils: path.resolve(__dirname, 'src/client/utils'),
    }
  }
};

module.exports = webpackConfig;*/