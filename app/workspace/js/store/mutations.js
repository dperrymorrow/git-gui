"use strict";

const _ = require("../../../util/lodash");

module.exports = {
  addRepo(state, path) {
    state.repos.push({ path, name: _.last(path.split("/")) });
  },

  setStatus(state, status) {
    state.status = status;
  },

  setLog(state, log) {
    state.log = log;
  },

  setActiveRepo(state, path) {
    state.activeRepo = path;
  },
};
