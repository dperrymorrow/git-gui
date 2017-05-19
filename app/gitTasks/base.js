"use strict";

const colors = require("colors");

let cwd;
const exec = require("child-process-promise").exec;

module.exports = {
  set dir(_dir) {
    cwd = _dir;
  },

  get dir() {
    return cwd;
  },

  run(cmd, args = [], dryRun = false) {
    args.forEach((arg, index) => {
      cmd = cmd.replace(`{${index}}`, arg);
    });

    if (dryRun) {
      console.log(args);
      console.log(cmd);
      return Promise.resolve(cmd);
    }

    return exec(`cd ${cwd} && ${cmd}`).then(result => {
      return result.stdout;
    });
  },
};
