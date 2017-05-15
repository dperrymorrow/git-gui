"use strict";

module.exports = {
  lineDilem: "[l]",
  entryDilem: "[e]",
  formatFields: ["sha", "subject", "body", "authorName", "authorEmail", "date"],
  branchRemote: "git branch --remotes",
  branchLocal: "git branch --list",
  branchCurrent: "git rev-parse --abbrev-ref HEAD",
  status: "git status --porcelain",
  log: "git log --format='[e]%n[l] sha: %H%n[l] author: %an %n[l] email: %ae %n[l] data: %ar %n[l] subject: %s%n[l] body: %b'",
  fetch: "git fetch --all",
  show: `git show {0} --pretty=format:'{"commit": "%H", "author":"%aN <%aE>", "date": "%ad", "subject": "%s", "body": "%b"}'`,
};



git show 1d67d06d9c67eaa804ff40b93a0b0e2968b310f1 --pretty=format:'%n[l] sha: %H%n[l] author: %an %n[l] email: %ae %n[l] data: %ar %n[l] subject: %s%n[l] body: %b'
