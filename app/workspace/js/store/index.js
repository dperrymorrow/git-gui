"use strict";

const storage = require("../../../storage");
const _ = require("../../../util/lodash");
const git = require("../../../gitTasks");

function init() {
  return storage.loadData().then(data => {
    if (!_.isEmpty(data.repos) && !data.activeRepo) data.activeRepo = data.repos[0];
    if (data.activeRepo) git.base.dir = data.activeRepo;

    return new Vuex.Store({
      state: {
        activeRepo: data.activeRepo,
        repos: data.repos,
        status: {},
        log: [],
      },

      strict: window.ENV == "development",

      modules: {},

      getters: {},

      actions: require("./actions"),

      mutations: require("./mutations"),
    });
  });
}

module.exports = { init };
