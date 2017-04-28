'use strict';

const commands = require('./commands.json');
const base = require('./base');
const _ = require('../util/lodash');
const parse = require('../util/parsing');

const codes = {
  M: 'Modified',
  D: 'Deleted',
  '??': 'Untracked',
};

module.exports = function() {
  return base
    .run(commands.status)
    .then(files => {
      if (files.includes('working tree clean')) return [];
      return parse.toArray(files).map(file => {
        const segs = file.trim().split(' ');
        return {
          file: segs[1],
          status: codes[segs[0]],
        };
      });
    })
    .catch(err => {
      console.log('Error'.red, err);
    });
};
