"use strict";
const test = require("ava");
const git = require("../gitTasks");
const { stubWithFile, trace } = require("./helpers");

test("gets log", t => {
  stubWithFile("log");

  return git.log().then(commits => {
    const first = commits[0];

    t.is(first.author, "Jordan Linxwiler");
    t.is(first.sha, "c4ab4b078257f00448fcb7810eed0fab9899ea2e");
    t.is(first.date, "6 days ago");
  });
});
