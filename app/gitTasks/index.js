"use strict";

const base = require("./base");
const commands = require("./commands.json");

module.exports = {
  log: require("./log"),
  status: require("./status"),
  branch: require("./branch"),
  base,
  show: require("./show"),
  commit(subject, body = "") {
    return base.run(commands.commit, [subject, body]).catch(console.error);
  },
  addAll() {
    return base.run(commands.addAll).catch(console.error);
  },
};
