"use strict";
const test = require("ava");
const git = require("../gitTasks");
const { stubWithFile, trace } = require("./helpers");

test("gets status", t => {
  stubWithFile("status");

  return git.status().then(files => {
    trace(files);
    t.true(Array.isArray(files));
    t.is(files[0].status, "Modified");
    t.is(files[4].status, "Deleted");
  });
});
