"use strict";

const _ = require(`${ROOT}/util/lodash`);
const git = require(`${ROOT}/gitTasks`);
const storage = require(`${ROOT}/storage`);

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
      .then(() => context.dispatch("gitBranches"))
      .then(() => context.dispatch("gitStatus"))
      .then(() => context.dispatch("gitLog"))
      .catch(console.error);
  },

  gitBranches(context) {
    return git.branch
      .current()
      .then(curBranch => {
        context.commit("setCurrentBranch", curBranch);
        return git.branch.local();
      })
      .then(locals => {
        context.commit("setLocalBranches", locals);
        return git.branch.remote();
      })
      .then(remotes => {
        context.commit("setRemoteBranches", remotes);
        return remotes;
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
