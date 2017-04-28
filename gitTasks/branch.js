'use strict';

const commands = require('./commands.json');
const base = require('./base');
const _ = require('../util/lodash');
const parse = require('../util/parsing');

module.exports = {
  current() {
    return base
      .run(commands.branchCurrent)
      .then(branchName => branchName.trim())
      .catch(err => {
        console.log(err);
      });
  },

  remote() {
    return base.run(commands.branchRemote).then(_parse).catch(err => {
      console.error(err);
    });
  },

  local() {
    return base.run(commands.branchLocal).then(_parse).catch(err => {
      console.error(err);
    });
  },
};

function _parse(output) {
  return _.uniq(parse.toArray(output).map(branch => _getName(branch)));
}

function _getName(branch) {
  return _.last(branch.replace('* ', '').split('/')).trim();
}
