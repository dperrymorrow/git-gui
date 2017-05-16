"use strict";
const test = require("ava");
const git = require("../gitTasks");
const { stubWithFile } = require("./helpers");

test("gets the current branch", t => {
  stubWithFile("branchCurrent");

  return git.branch.current().then(branch => {
    t.is("master", branch);
  });
});

test("gets remote branches", t => {
  stubWithFile("branchRemote");

  return git.branch.remote().then(branches => {
    t.true(Array.isArray(branches));
    t.true(branches.includes("master"));
    t.true(branches.includes("gh-pages"));
  });
});

test("gets local branches", t => {
  stubWithFile("branchLocal");

  return git.branch.local().then(branches => {
    t.true(Array.isArray(branches));
    t.true(branches.includes("master"));
  });
});
