'use strict';

const commands = require('./commands.json');
const base = require('./base');
const _ = require('../util/lodash');
const parse = require('../util/parsing');

module.exports = function() {
  return base
    .run(commands.log)
    .then(results => {
      return parse(results).split(commands.dilem).arr.map(commit => {
        console.log(parse(commit).asYAML());
        return parse(commit).asYAML();
      });
    })
    .catch(err => {
      console.log(err);
    });
};
