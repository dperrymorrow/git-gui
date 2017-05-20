"use strict";

module.exports = {
  isDirty(state) {
    return state.status.length > 0;
  },

  hasErrors(state) {
    return state.errors.length > 0;
  },

  repoNames(state) {
    return state.repos.map(repo => repo.name);
  },

  activeRepoName(state) {
    const active = state.repos.find(repo => repo.path == state.activeRepo);
    return active ? active.name : null;
  },
};
