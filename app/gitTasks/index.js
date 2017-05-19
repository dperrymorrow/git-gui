"use strict";

const base = require("./base");
const commands = require("./commands.json");

module.exports = {
  base,
  log: require("./log"),
  status: require("./status"),
  branch: require("./branch"),
  show: require("./show"),
  commit(args) {
    return base.run(commands.commit, [args]).catch(console.error);
  },
  addAll() {
    return base.run(commands.addAll).catch(console.error);
  },
};
