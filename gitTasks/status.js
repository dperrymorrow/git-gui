"use strict";

const commands = require("./commands.json");
const base = require("./base");
const parse = require("../util/parsing");

const codes = {
  M: "Modified",
  D: "Deleted",
  "??": "Untracked",
};

module.exports = function() {
  return base
    .run(commands.status)
    .then(files => {
      return files.includes("working tree clean") ? [] : parse(files).split().arr;
    })
    .then(list => {
      return list.map(file => {
        const segs = file.trim().split(" ");
        return {
          file: segs[1],
          status: codes[segs[0]],
        };
      });
    })
    .catch(console.log);
};
