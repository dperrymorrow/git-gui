'use strict';

const Git = require('nodegit');
const path = require('path');
const sshKey = require('./sshKey');
const colors = require('colors');

module.exports = function(dir) {
  const gitDir = path.resolve(dir, '.git');

  return new Promise((resolve, reject) => {
    Git.Repository
      .open(gitDir)
      .then(repo => {
        return repo.fetch('origin', {
          callbacks: {
            credentials(url, userName) {
              return Git.Cred.sshKeyFromAgent(userName);
            },
          },
        });
      })
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
};
