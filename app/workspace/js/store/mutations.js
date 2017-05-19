"use strict";

const _ = require(`${ROOT}/util/lodash`);

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

  setCurrentBranch(state, branch) {
    state.currentBranch = branch;
  },

  setRemoteBranches(state, branches) {
    state.remoteBranches = branches;
  },

  removeRepo(state, path) {
    state.repos = state.repos.filter(repo => repo.path != path);
  },

  setLocalBranches(state, branches) {
    state.localBranches = branches;
  },
};
