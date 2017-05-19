"use strict";

const _ = require("../../../util/lodash");
const git = require("../../../gitTasks");
const storage = require("../../../storage");

module.exports = {
  gitLog(context) {
    return git
      .log()
      .then(log => {
        context.commit("setLog", log);
        return log;
      })
      .catch(console.error);
  },

  changeRepo(context, path) {
    context.commit("setActiveRepo", path);
    git.base.dir = path;
    return _updateRepos(context.state.repos, context.state.activeRepo)
      .then(() => {
        return context.dispatch("gitStatus");
      })
      .then(() => {
        return context.dispatch("gitLog");
      });
  },

  gitStatus(context) {
    return git
      .status()
      .then(status => {
        context.commit("setStatus", status);
        return status;
      })
      .catch(console.error);
  },
};

function _updateRepos(repos, activeRepo) {
  repos = JSON.parse(JSON.stringify(repos));

  return storage.loadData().then(data => {
    data.repos = repos;
    data.activeRepo = activeRepo;
    return storage.saveData(data);
  });
}
