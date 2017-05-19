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
    return base.run(commands.commit, args).catch(err => Promise.reject(err));
  },
  addAll() {
    return base.run(commands.addAll).catch(err => Promise.reject(err));
  },
  push() {
    return base.run(commands.push).catch(err => Promise.reject(err));
  },

  pull() {
    return base.run(commands.pull).catch(err => Promise.reject(err));
  },
};
