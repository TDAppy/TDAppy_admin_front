// src/tests/config/karma.base.conf.js
const path = require('path');

module.exports = function baseConfig(config, overrides = {}) {
  const defaultConfig = {
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
    ],
    client: {
      jasmine: { random: false },
    },
    coverageReporter: {
      dir: path.resolve(__dirname, '../../../coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false,
  };

  config.set(Object.assign({}, defaultConfig, overrides));
};
