// src/tests/config/karma.integration.conf.js
const baseConfig = require('./karma.base.conf');
const path = require('path');

module.exports = function (config) {
  baseConfig(config, {
    files: ['../../tests/integration/**/*.spec.ts'],
    coverageReporter: {
      dir: path.resolve(__dirname, '../../../coverage/integration'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    tsConfig: './tsconfig.integration.spec.json',
  });
};
