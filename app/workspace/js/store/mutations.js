"use strict";

const _ = require(`${ROOT}/util/lodash`);

module.exports = {
  setStatus(state, status) {
    state.status = status;
  },

  setLog(state, log) {
    state.log = log;
  },

  // branches
  setCurrentBranch(state, branch) {
    state.currentBranch = branch;
  },

  setRemoteBranches(state, branches) {
    state.remoteBranches = branches;
  },
  setLocalBranches(state, branches) {
    state.localBranches = branches;
  },

  // errors

  addError(state, error) {
    state.errors.push(error);
  },

  clearErrors(state) {
    state.errors = [];
  },

  // repos
  setActiveRepo(state, path) {
    state.activeRepo = path;
  },

  addRepo(state, path) {
    state.repos.push({ path, name: _.last(path.split("/")) });
  },
  removeRepo(state, path) {
    state.repos = state.repos.filter(repo => repo.path != path);
  },
};
