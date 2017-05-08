'use strict';

const dilem = '--';

module.exports = {
  dilem,
  formatFields: ['sha', 'subject', 'body', 'authorName', 'authorEmail', 'date'],
  branchRemote: 'git branch --remotes',
  branchLocal: 'git branch --list',
  branchCurrent: 'git rev-parse --abbrev-ref HEAD',
  status: 'git status --porcelain',
  log: `git log --format='${dilem} %nsha: %H %nauthor: %an %nemail: %ae %ndata: %ar %nsubject: %s%nbody: %b'`,
  fetch: 'git fetch --all',
  show: `git show {0} --pretty=format:'{"commit": "%H", "author":"%aN <%aE>", "date": "%ad", "subject": "%s", "body": "%b"}</endJSON>'`,
};
