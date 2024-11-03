module.exports = function (config) {
  'use strict';

  config.set({
    browsers: ['Chrome', 'Firefox'],
    debug: true,

    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'lib/*.css',
      'lib/*.js',
      '__tests__/fixtures/*.html',
      '__tests__/spec_helper.js',
      '__tests__/javascripts/**/*.js',
    ],

    frameworks: ['jasmine', 'fixture'],
    logLevel: config.LOG_ERROR,
    preprocessors: { '**/*.html': ['html2js'] },
    singleRun: true,
  });
};
