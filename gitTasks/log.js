const Git = require('nodegit');
const path = require('path');
const colors = require('colors');

module.exports = function(dir, max = 10) {
  const gitDir = path.resolve(dir, '.git');
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

      history.on('end', commits => {
        const mapped = commits.map(commit => {
          return {
            sha: commit.sha(),
            data: commit.date(),
            message: commit.message(),
            author: {
              name: commit.author().name(),
              email: commit.author().email(),
            },
          };
        });
        res(mapped);
      });

      // Start emitting events.
      history.start();
      return promise;
    })
    .catch(err => {
      console.log(err);
    });
};
