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
      },

      strict: window.ENV == "development",

      modules: {},

      getters: {},

      actions: {
        gitStatus(context) {
          return git
            .status()
            .then(status => {
              console.log(status);
              context.commit("setStatus", status);
              return status;
            })
            .catch(console.error);
        },
      },

      mutations: {
        addRepo(state, path) {
          state.repos.push({ path, name: _.last(path.split("/")) });
          _updateRepos(state.repos, state.activeRepo);
        },

        setStatus(state, status) {
          state.status = status;
        },

        setActiveRepo(state, path) {
          state.activeRepo = path;
          git.base.dir = path;
          _updateRepos(state.repos, state.activeRepo);
        },
      },
    });
  });
}

function _updateRepos(repos, activeRepo) {
  repos = JSON.parse(JSON.stringify(repos));
  return storage.loadData().then(data => {
    data.repos = repos;
    data.activeRepo = activeRepo;
    return storage.saveData(data);
  });
}

module.exports = { init };
