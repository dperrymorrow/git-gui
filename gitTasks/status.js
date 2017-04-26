'use strict';

const Git = require('nodegit');
const path = require('path');
const colors = require('colors');

function gitStatus(dir) {
  const gitDir = path.resolve(dir, '.git');

  console.log(gitDir.yellow);

  return Git.Repository.open(gitDir).then(repo => {
    return repo
      .getStatus()
      .then(files => {
        return {
          renamed: _filterBy(files, 'isRenamed'),
          isNew: _filterBy(files, 'isNew'),
          deleted: _filterBy(files, 'isDeleted'),
          ignored: _filterBy(files, 'isIgnored'),
          modified: _filterBy(files, 'isModified'),
        };
      })
      .catch(err => {
        console.log('Error'.red, err);
      });
  });
}

function _filterBy(files, method) {
  return files.filter(file => file[method]()).map(file => file.path());
}

gitStatus('/Users/david.morrow/builds/useful-shit/')
  .then(grouped => {
    console.log(JSON.stringify(grouped, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
