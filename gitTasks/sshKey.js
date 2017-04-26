'use strict';
const Git = require('nodegit');
const path = require('path');
const colors = require('colors');

var sshPublicKeyPath = '~/.ssh/codecommit_rsa.pub';
var sshPrivateKeyPath = '~/.ssh/codecommit_rsa';

module.exports = {
  getNew(url, userName) {
    return Git.Cred.sshKeyNew(
      userName,
      sshPublicKeyPath,
      sshPrivateKeyPath,
      ''
    );
  },
};
