const test = require("ava");
const sinon = require("sinon");
const commands = require("../gitTasks/commands.json");
const git = require("../gitTasks");
const fs = require("fs");
const colors = require("colors");
const _ = require("../util/lodash");
const stubbed = true;

_trace(commands);

function _stubRun(key) {
  if (!stubbed) return;
  const stub = sinon.stub().callsFake(() => {
    return Promise.resolve(
      fs.readFileSync(`${__dirname}/stubs/${key}.txt`, "utf8")
    );
  });
  git.base.run = stub;
  return stub;
}

function _trace(obj) {
  console.log(JSON.stringify(obj, null, 2).yellow);
}

test.beforeEach(() => {
  git.base.dir = "/Users/david.morrow/builds/git-gui";
});

// testing initialization

test("gets the current branch", t => {
  const stub = _stubRun("branchCurrent");

  return git.branch.current().then(branch => {
    t.is("master", branch);
  });
});

test("gets remote branches", t => {
  const stub = _stubRun("branchRemote");

  return git.branch.remote().then(branches => {
    t.true(Array.isArray(branches));
    t.true(branches.includes("master"));
    t.true(branches.includes("gh-pages"));
  });
});

test("gets local branches", t => {
  const stub = _stubRun("branchLocal");

  return git.branch.local().then(branches => {
    t.true(Array.isArray(branches));
    t.true(branches.includes("master"));
  });
});

test("gets status", t => {
  const stub = _stubRun("status");

  return git.status().then(files => {
    t.true(Array.isArray(files));
    t.is(files[0].status, "Modified");
    t.is(files[4].status, "Deleted");
  });
});

test("gets log", t => {
  const stub = _stubRun("log");

  return git.log().then(commits => {
    const first = commits[0];

    t.is(first.author, "Jordan Linxwiler");
    t.is(first.sha, "c4ab4b078257f00448fcb7810eed0fab9899ea2e");
    t.is(first.date, "6 days ago");
  });
});

test("gets show", t => {
  const stub = _stubRun("show");
  return git.show("3446631ee0e51b15f7f3cc36db143122dc7e7cc5").then(diffs => {
    _trace(diffs);
  });
});
