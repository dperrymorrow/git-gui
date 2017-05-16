"use strict";

const commands = require("./commands.json");
const base = require("./base");
const _ = require("../util/lodash");
const parse = require("../util/parsing");

module.exports = function() {
  return base
    .run(commands.log)
    .then(results => {
      return parse(results).split(commands.entryDilem).arr.map(commit => {
        // console.log(parse(commit).asYAML());
        console.log(parse(commit).split(commands.lineDilem).arr);
        return commit;
      });
    })
    .catch(err => {
      console.log(err);
    });
};
