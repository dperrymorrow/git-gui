'use strict';

const _ = require('./lodash');

module.exports = {
  splitBetween(string, start, end = '\n') {
    try {
      return string.split(start)[1].split(end)[0].trim();
    } catch (err) {
      console.warn(err);
      return '';
    }
  },

  toArray(string, splitOn = '\n') {
    return string
      .split(splitOn)
      .filter(seg => !_.isEmpty(seg))
      .map(seg => seg.trim());
  },
};
