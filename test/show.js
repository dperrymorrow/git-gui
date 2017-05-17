"use strict";
const test = require("ava");
const git = require("../app/gitTasks");
const { stubWithFile, trace } = require("./helpers");

test("gets show", t => {
  t.plan(2);
  stubWithFile("show");
  return git.show("dd").then(diffs => {
    t.is(diffs.author, "Jordan Linxwiler");
    t.is(diffs.sha, "126b2acceafa35fa84f05c677e4eb5da28976e00");
  });
});
