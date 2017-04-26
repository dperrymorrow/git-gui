const Git = require('nodegit');
const path = require('path');
const colors = require('colors');

function gitLog(dir, max = 10) {
  const gitDir = path.resolve(dir, '.git');

  console.log(gitDir.yellow);
  // Open the repository directory.
  return Git.Repository
    .open(gitDir)
    .then(repo => repo.getMasterCommit())
    .then(firstCommitOnMaster => {
      let res, rej;
      // Create a new history event emitter.
      const history = firstCommitOnMaster.history();
      const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      let commits = [];
      // Listen for commit events from the history.
      history.on('commit', commit => {
        if (commits.length >= max) {
          res(commits);
        }
        commits.push({
          sha: commit.sha(),
          data: commit.date(),
          message: commit.message(),
          author: {
            name: commit.author().name(),
            email: commit.author().email(),
          },
        });
      });

      // Start emitting events.
      history.start();
      return promise;
    })
    .catch(err => {
      console.log(err);
    });
}

gitLog('/Users/david.morrow/builds/useful-shit/')
  .then(commits => {
    console.log(JSON.stringify(commits, null, 2).green);
  })
  .catch(err => {
    console.log(err);
  });
