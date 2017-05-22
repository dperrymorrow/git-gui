"use strict";

const _ = require("../util/lodash");
const base = require("./base");
const parse = require("../util/parsing");
const commands = require("./commands.json");
const diff = require("./diff");

module.exports = function(sha) {
  let ret;
  return base
    .run(commands.show, [sha])
    .then(results => {
      const ret = parse(results).split(commands.entryDilem).first().toObject();
      ret.files = parse(results).split(commands.entryDilem).last().split("diff --git").map(diff).arr;
      return ret;
    })
    .catch(console.log);
};
