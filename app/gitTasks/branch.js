"use strict";

const commands = require("./commands.json");
const base = require("./base");
const _ = require("../util/lodash");
const parse = require("../util/parsing");

module.exports = {
  current() {
    return base.run(commands.branchCurrent).then(branchName => branchName.trim()).catch(console.log);
  },

  remote() {
    return base.run(commands.branchRemote).then(_parse).catch(console.log);
  },

  local() {
    return base.run(commands.branchLocal).then(_parse).catch(console.log);
  },
};

function _parse(output) {
  return _.uniq(parse(output).split().arr).map(_getName);
}

function _getName(branch) {
  return _.last(branch.replace("* ", "").split("/"));
}
