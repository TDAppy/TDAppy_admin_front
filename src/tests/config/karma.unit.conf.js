// src/tests/config/karma.unit.conf.js
const baseConfig = require('./karma.base.conf');
const path = require('path');

module.exports = function (config) {
  baseConfig(config, {
    files: ['../../tests/unit/**/*.spec.ts'],
    coverageReporter: {
      dir: path.resolve(__dirname, '../../../coverage/unit'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    tsConfig: './tsconfig.unit.spec.json',
  });
};
