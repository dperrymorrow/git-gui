"use strict";

const _ = require("../util/lodash");
const base = require("./base");
const parse = require("../util/parsing");
const commands = require("./commands.json");

module.exports = function(sha) {
  let ret;
  return base
    .run(commands.show, [sha])
    .then(results => {
      const ret = parse(results).split(commands.entryDilem).first().toObject();
      ret.files = parse(results).split(commands.entryDilem).last().split("diff --git").map(_parseFile).arr;
      return ret;
    })
    .catch(console.log);
};

function _parseFile(fileDiff) {
  const file = parse(fileDiff).findBetween("a/", "b/").str;

  const diffs = parse(fileDiff).split("\n@@").arr;
  diffs.splice(0, 1);

  return {
    file,
    numDiffs: diffs.length,
    diffs: diffs.map(diff => {
      const diffSegs = parse(diff).split("@@").arr;
      return {
        indexes: diffSegs[0].split(" "),
        summary: diffSegs[1],
      };
    }),
  };
}
