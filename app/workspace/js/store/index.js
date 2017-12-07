"use strict";

const storage = require(`${ROOT}/storage`);
const _ = require(`${ROOT}/util/lodash`);
const git = require(`${ROOT}/gitTasks`);

function init() {
  return storage.loadData().then(data => {
    if (!_.isEmpty(data.repos) && !data.activeRepo) data.activeRepo = data.repos[0];

    const store = new Vuex.Store({
      state: {
        mode: "status",
        inset: null,
        activeRepo: null,
        repos: data.repos,
        status: {},
        log: [],
        errors: [],
        currentBranch: null,
        defaultBranch: null,
        remoteBranches: [],
        localBranches: [],
      },

      strict: window.ENV === "development",

      modules: {},
      getters: require("./getters"),
      actions: require("./actions"),
      mutations: require("./mutations"),
    });

    if (data.activeRepo) {
      // foobar
      store.dispatch("changeRepo", data.activeRepo);
    }

    return store;
  });
}

module.exports = { init };
