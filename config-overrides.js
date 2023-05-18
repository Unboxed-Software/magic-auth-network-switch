const webpack = require("webpack")
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    url: false,
    assert: false,
    crypto: false,
    http: false,
    https: false,
    os: false,
    buffer: false,
    stream: false,
    process: false,
  }
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  )

  return config
}
