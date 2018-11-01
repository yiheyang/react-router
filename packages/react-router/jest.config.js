let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/cjs/react-router.js";
    break;
  case "umd":
    mappedModule = "<rootDir>/umd/react-router.js";
    break;
  case "esm":
    mappedModule = "<rootDir>/esm/react-router.js";
    break;
  default:
    mappedModule = "<rootDir>/modules/index.js";
}

let config = {
  testRunner: "jest-circus/runner",
  restoreMocks: true,
  globals: {
    __DEV__: true
  },
  moduleNameMapper: {
    "^react-router$": mappedModule
  },
  modulePaths: ["<rootDir>/node_modules"],
  setupFiles: ["raf/polyfill"],
  testMatch: ["**/__tests__/**/*-test.js"],
  testURL: "http://localhost/"
};

if (process.env.TEST_ENV === "esm") {
  config.transform = {
    "\\.js$": "<rootDir>/transformCJS.js"
  };

  config.transformIgnorePatterns = ["/node_modules/(?!@babel/runtime)/"];
}

module.exports = config;
