const test = require('ava');
const sinon = require('sinon');
const commands = require('../gitTasks/commands.json');
const git = require('../gitTasks');
const fs = require('fs');
const colors = require('colors');
const _ = require('../util/lodash');
const stubbed = true;

function _stubRun(key) {
  if (!stubbed) return;
  const stub = sinon.stub().callsFake(() => {
    return Promise.resolve(
      fs.readFileSync(`${__dirname}/stubs/${key}.txt`, 'utf8')
    );
  });
  git.base.run = stub;
  return stub;
}

function _trace(obj) {
  console.log(JSON.stringify(obj, null, 2).yellow);
}

test.beforeEach(() => {
  git.base.dir = '/Users/david.morrow/builds/git-gui';
});

// testing initialization

test('gets the current branch', t => {
  const stub = _stubRun('branchCurrent');

  return git.branch.current().then(branch => {
    t.is('master', branch);
  });
});

test('gets remote branches', t => {
  const stub = _stubRun('branchRemote');

  return git.branch.remote().then(branches => {
    t.true(Array.isArray(branches));
    t.true(branches.includes('master'));
    t.true(branches.includes('gh-pages'));
  });
});

test('gets local branches', t => {
  const stub = _stubRun('branchLocal');

  return git.branch.local().then(branches => {
    t.true(Array.isArray(branches));
    t.true(branches.includes('master'));
  });
});

test('gets status', t => {
  const stub = _stubRun('status');

  return git.status().then(files => {
    t.true(Array.isArray(files));
    t.is(files[0].status, 'Modified');
    t.is(files[4].status, 'Deleted');
  });
});

test('gets log', t => {
  const stub = _stubRun('log');

  return git.log().then(commits => {
    const first = commits[0];
    const last = _.last(commits);

    t.is(first.author, 'dperrymorrow <dperrymorrow@gmail.com>');
    t.is(first.message, 'dead letter activity view');
    t.is(first.date, 'Fri Apr 21 12:57:19 2017 -0700');
    t.is(first.commit, 'dfacdc044890a6c626e77a9c3e9318d9f4b018c1');

    t.is(last.author, 'dperrymorrow <dperrymorrow@gmail.com>');
    t.is(last.message, 'bump useful-shit version');
    t.is(last.date, 'Wed Apr 19 16:47:14 2017 -0700');
    t.is(last.commit, '0bea9fdb58c825b57d2ee8cf69f667af43e768f4');
  });
});
