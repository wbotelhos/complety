module.exports = function (config) {
  'use strict';

  config.set({
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],

    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',

      'spec/helper.js',

      'spec/fixtures/*.html',

      'lib/*.css',
      'lib/*.js',

      'spec/**/*.js',
    ],

    frameworks: ['jasmine', 'fixture'],
    logLevel: config.LOG_ERROR,
    preprocessors: { '**/*.html': ['html2js'] },
    singleRun: true,
  });
};
