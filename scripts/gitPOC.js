const git = require('../gitTasks');
const colors = require('colors');
const dir = '/Users/david.morrow/builds/PDX-Industrial/';
const method = process.argv.splice(-1)[0];

const methods = {
  log() {
    git.log(dir, 10).then(_trace);
  },
  status() {
    git.status(dir).then(_trace);
  },

  fetch() {
    git.fetch(dir).then(_trace);
  },

  branches() {
    git.branch.list(dir).then(_trace);
  },
};

console.log(dir.cyan);

if (methods[method] == undefined) {
  throw new Error(`${method} was not found in scripts/gitPOC.js`);
} else {
  methods[method]();
}

function _trace(item) {
  console.log(JSON.stringify(item, null, 2).yellow);
}
