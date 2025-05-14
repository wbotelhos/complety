const $ = require('jquery');
const fs = require('fs');
const path = require('path');

require('../lib/complety');

global.$ = $;
global.jQuery = $;

global.context = function context(description, spec) {
  'use strict';

  describe(description, spec);
}

global.loadHtml = (filePath)  =>{
  const fullPath = path.resolve(__dirname, './fixtures', filePath);
  const html = fs.readFileSync(fullPath, 'utf8');

  document.body.innerHTML = html;
};
