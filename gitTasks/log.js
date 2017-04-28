'use strict';

const commands = require('./commands.json');
const base = require('./base');
const _ = require('../util/lodash');
const parse = require('../util/parsing');

module.exports = function() {
  return base
    .run(commands.log)
    .then(results => {
      return results.split('\n\ncommit ').map(_parseCommit);
    })
    .catch(err => {
      console.log(err);
    });
};

function _parseCommit(commit) {
  const segs = parse.toArray(commit);

  return {
    commit: segs[0].replace('commit', '').trim(),
    author: parse.splitBetween(commit, 'Author:'),
    date: parse.splitBetween(commit, 'Date:'),
    message: _.last(parse.toArray(commit)),
  };
}
