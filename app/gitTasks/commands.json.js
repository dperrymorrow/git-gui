"use strict";

module.exports = {
  lineDilem: "[l]",
  entryDilem: "[e]",
  formatFields: ["sha", "subject", "body", "authorName", "authorEmail", "date"],
  branchRemote: "git branch --remotes",
  branchLocal: "git branch --list",
  branchCurrent: "git rev-parse --abbrev-ref HEAD",
  branchCheckout: "git checkout {0}",
  branchCreate: "git checkout -b {0}",
  addAll: "git add -A",
  push: "git push",
  pull: "git pull",
  commit: 'git commit -m "{0}" -m "{1}"',
  status: "git status --porcelain",
  log: "git log --format='[e]%n[l] sha: %H%n[l] author: %an %n[l] email: %ae %n[l] date: %ar %n[l] subject: %s%n[l] body: %b'",
  fetch: "git fetch --all",
  show: `git show {0} --pretty=format:'[e]%n[l] sha: %H%n[l] author: %an %n[l] email: %ae %n[l] date: %ar %n[l] subject: %s%n[l] body: %b%n[e]'`,
};
