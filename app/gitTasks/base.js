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

  run(cmd, args = []) {
    args.forEach((arg, index) => {
      cmd.replace(`{${index}}`, arg);
    });

    return exec(`cd ${cwd} && ${cmd}`).then(result => {
      return result.stdout;
    });
  },
};
