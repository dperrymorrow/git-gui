'use strict';

const Git = require('nodegit');
const path = require('path');
const colors = require('colors');

module.exports = {
  list(dir) {
    return Git.Repository
      .open(dir)
      .then(repo => repo.getReferenceNames(Git.Reference.TYPE.LISTALL))
      .then(refs => {
        const branches = {
          local: [],
          remote: [],
        };

        refs.forEach(ref => {
          const branch = {
            name: ref.split('/').splice(-1)[0],
            path: ref,
          };
          const target = ref.includes('remote')
            ? branches.remote
            : branches.local;

          if (['HEAD', 'stash'].includes(branch.name)) return;
          target.push(branch);
        });

        return branches;
      })
      .catch(err => {
        console.error(err);
      });
  },
};
