"use strict";

const commands = require("./commands.json");
const base = require("./base");
const _ = require("../util/lodash");
const parse = require("../util/parsing");

module.exports = function() {
  return base
    .run(commands.log)
    .then(results => {
      return parse(results).split(commands.entryDilem).arr;
    })
    .then(entries => {
      return entries.map(commit => {
        const obj = {};
        parse(commit).split(commands.lineDilem).arr.forEach(line => {
          const keyVal = parse(line).toKeyVal();
          obj[keyVal.key] = keyVal.val;
        });
        return obj;
      });
    })
    .catch(err => {
      console.log(err);
    });
};
