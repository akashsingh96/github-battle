const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/" // is it referring to index.html inside the dist folder while we are running in development mode ???
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            //  ts-loader helps Webpack compile your TypeScript code using the TypeScript’s standard configuration file named tsconfig.json
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        //source-map-loader uses any sourcemap outputs from TypeScript to inform webpack when generating its own sourcemaps
        // This will allow you to debug your final output file as if you were debugging your original TypeScript source code.
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};
