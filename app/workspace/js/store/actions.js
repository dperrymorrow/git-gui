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
      .catch(err => {
        context.commit("addError", err);
      });
  },

  // branches
  changeBranch(context, branch) {
    return git.branch
      .checkout(branch)
      .then(() => {
        context.commit("setCurrentBranch", branch);
        return context.dispatch("refresh");
      })
      .catch(err => {
        context.commit("addError", err);
      });
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
        return git.branch.default();
      })
      .then(defaultBranch => {
        context.commit("setDefaultBranch", defaultBranch);
        return defaultBranch;
      })
      .catch(err => {
        context.commit("addError", err);
      });
  },

  createBranch(context, branch) {
    return git.branch
      .create(branch)
      .then(() => context.dispatch("changeBranch", branch))
      .then(() => context.dispatch("refresh"))
      .catch(err => context.commit("addError", err));
  },

  changeRepo(context, path) {
    context.commit("setActiveRepo", path);
    git.base.dir = path;
    return context.dispatch("refresh");
  },

  // commits and remote actions

  addAll(context) {
    return git.addAll();
  },

  push(context) {
    return git.push().then(() => context.dispatch("refresh")).catch(err => context.commit("addError", err));
  },

  pull(context) {
    return git.pull().then(() => context.dispatch("refresh")).catch(err => context.commit("addError", err));
  },

  commit(context, args) {
    return git
      .commit(args)
      .then(() => context.dispatch("gitLog"))
      .then(() => context.dispatch("gitStatus"))
      .catch(err => {
        context.commit("addError", err);
      });
  },

  refresh(context) {
    return _updateRepos(context.state.repos, context.state.activeRepo)
      .then(() => context.dispatch("gitBranches"))
      .then(() => context.dispatch("gitStatus"))
      .then(() => context.dispatch("gitLog"))
      .catch(err => {
        context.commit("addError", err);
      });
  },

  gitStatus(context) {
    return git
      .status()
      .then(status => {
        context.commit("setStatus", status);
        return status;
      })
      .catch(err => {
        context.commit("addError", err);
      });
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
