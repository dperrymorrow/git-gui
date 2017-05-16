"use strict";

const _ = require("./lodash");
const commands = require("../gitTasks/commands.json");
const colors = require("colors");

module.exports = function(str) {
  return {
    str: str,
    arr: [],

    findBetween(start, end = "\n") {
      try {
        this.str = this.str.split(start)[1].split(end)[0].trim();
      } catch (err) {
        this.str = "";
      }
      return this;
    },

    first() {
      const first = this.arr[0];
      this.str = first;
      this.arr = [first];
      return this;
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

    join(char = ",") {
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

    split(splitOn = "\n") {
      this.arr = this.str.split(splitOn).filter(seg => !_.isEmpty(seg)).map(seg => seg.trim());
      return this;
    },
  };
};

function _escapeJSON(str) {
  return str.replace(/\\/g, "\\");
}

function _removeLineBreaks(str) {
  return str.replace(/\n|\r/g, " ");
}
