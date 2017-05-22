"use strict";
const parse = require("../util/parsing");

module.exports = function(fileDiff) {
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
};
