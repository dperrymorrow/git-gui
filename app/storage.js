"use strict";

const storage = require("electron-storage");
const FILE_NAME = "git-gui-settings.json";

const DEFAULT = {
  window: {
    x: 0,
    y: 0,
    width: 1324,
    height: 920,
  },
  activeRepo: null,
  repos: [],
};

module.exports = {
  loadData() {
    return storage.isPathExists(FILE_NAME).then(exists => {
      return exists ? _retrieve() : _create();
    });
  },

  saveData(data) {
    return storage.set(FILE_NAME, data).then(() => data).catch(console.error);
  },
};

function _create() {
  return storage.set(FILE_NAME, DEFAULT).then(() => DEFAULT).catch(console.error);
}

function _retrieve() {
  return storage.get(FILE_NAME).then(data => data).catch(console.error);
}
