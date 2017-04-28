'use strict';

const colors = require('colors');

let cwd;
const exec = require('child-process-promise').exec;

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
      console.log(cmd.cyan);
      console.log(result.stdout.yellow);
      return result.stdout;
    });
  },
};
