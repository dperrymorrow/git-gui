"use strict";

module.exports = {
  lineDilem: "[l]",
  entryDilem: "[e]",
  formatFields: ["sha", "subject", "body", "authorName", "authorEmail", "date"],
  branchRemote: "git branch --remotes",
  branchLocal: "git branch --list",
  branchCurrent: "git rev-parse --abbrev-ref HEAD",
  status: "git status --porcelain",
  log: "git log --format='[e]%n[l] sha: %H%n[l] author: %an %n[l] email: %ae %n[l] date: %ar %n[l] subject: %s%n[l] body: %b'",
  fetch: "git fetch --all",
  show: `git show {0} --pretty=format:'[e]%n[l] sha: %H%n[l] author: %an %n[l] email: %ae %n[l] date: %ar %n[l] subject: %s%n[l] body: %b%n[e]'`,
};
