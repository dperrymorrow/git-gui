'use strict';

const _ = require('./lodash');
const commands = require('../gitTasks/commands.json');
const jsStringEscape = require('js-string-escape');
const colors = require('colors');
const yaml = require('js-yaml');

module.exports = function(str) {
  return {
    str: str,
    arr: [],

    findBetween(start, end = '\n') {
      try {
        this.str = this.str.split(start)[1].split(end)[0].trim();
      } catch (err) {
        this.str = '';
      }
      return this;
    },

    first() {
      const first = this.arr[0];
      this.str = first;
      this.arr = [first];
      return this;
    },

    asJSON() {
      try {
        return JSON.parse(_escapeJSON(this.str));
      } catch (err) {
        console.error(err, jsStringEscape(this.str));
      }
    },

    asYAML() {
      // this.split('subject: >').odd(_removeLineBreaks).join('\nsubject: ');
      // this.split('body: >')
      //   .map(item => {
      //     return item.split('\n').map(line => '  ' + line).join('  \n');
      //   })
      //   .join('\nbody: >\n');
      //
      // console.log(this.arr);
      console.log(this.str.green);

      return new Promise((resolve, reject) => {
        yaml.safeLoadAll(this.str, parsed => {
          resolve(parsed);
        });
      });
    },

    map(fn) {
      this.arr = this.arr.map(fn);
      return this;
    },

    odd(fn) {
      this.arr.map((item, index) => {
        return index & 1 ? fn(item) : item;
      });
      return this;
    },

    join(char = ',') {
      this.str = this.arr.join(char);
      return this;
    },

    removeReturns() {
      this.arr = this.arr.map(item => _removeLineBreaks);
      return this;
    },

    last() {
      const last = _.last(this.arr);
      this.str = last;
      this.arr = [last];
      return this;
    },

    split(splitOn = '\n') {
      this.arr = this.str
        .split(splitOn)
        .filter(seg => !_.isEmpty(seg))
        .map(seg => seg.trim());
      return this;
    },
  };
};

function _escapeJSON(str) {
  return str.replace(/\\/g, '\\');
}

function _removeLineBreaks(str) {
  return str.replace(/\n|\r/g, ' ');
}
