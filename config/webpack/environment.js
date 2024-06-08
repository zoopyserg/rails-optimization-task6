const { environment } = require('@rails/webpacker');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

// Exclude Chart.js and moment.js from the vendor bundle
environment.plugins.append(
  'CommonsChunkVendor',
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => {
      // Exclude Chart.js and moment.js from vendor bundle
      if (
        module.resource &&
        (/Chart\.js$/.test(module.resource) || /moment/.test(module.resource))
      ) {
        return false;
      }
      // This assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1;
    },
  }),
);

environment.plugins.append(
  'CommonsChunkManifest',
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  }),
);

// Adding the BundleAnalyzerPlugin
environment.plugins.append(
  'BundleAnalyzer',
  new BundleAnalyzerPlugin({
    analyzerMode: 'static', // Generates a static HTML file
    openAnalyzer: false, // Doesn't automatically open the report
    reportFilename: 'bundle-report.html', // The name of the report file
  }),
);

module.exports = environment;
