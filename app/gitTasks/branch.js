"use strict";

const commands = require("./commands.json");
const base = require("./base");
const _ = require("../util/lodash");
const parse = require("../util/parsing");

module.exports = {
  current() {
    return base.run(commands.branchCurrent).then(branchName => branchName.trim()).catch(console.error);
  },

  checkout(branch) {
    return base.run(commands.branchCheckout, [branch]).catch(console.error);
  },

  remote() {
    return base.run(commands.branchRemote).then(_parse).catch(console.error);
  },

  local() {
    return base.run(commands.branchLocal).then(_parse).catch(console.error);
  },
};

function _parse(output) {
  return _.uniq(parse(output).split().arr).map(_getName);
}

function _getName(branch) {
  return branch.replace("* ", "");
}
