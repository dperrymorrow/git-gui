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
  setDefaultBranch(state, branch) {
    state.defaultBranch = branch;
  },

  // mode
  setMode(state, mode) {
    state.mode = mode;
  },

  // errors
  addError(state, error) {
    console.error(error);
    state.errors.push(error);
  },
  clearErrors(state) {
    state.errors = [];
  },

  // inset components
  setInset(state, component) {
    state.inset = component;
  },

  clearInset(state) {
    state.inset = null;
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
