let babelJest = require("babel-jest");

let transformer = babelJest.createTransformer({
  plugins: ["@babel/transform-modules-commonjs"]
});

module.exports = transformer;
