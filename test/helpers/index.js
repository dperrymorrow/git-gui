"use strict";

const git = require("../../app/gitTasks");
const sinon = require("sinon");
const colors = require("colors");
const fs = require("fs");

module.exports = {
  stubWithFile(key) {
    const stub = sinon.stub().callsFake(() => {
      return Promise.resolve(fs.readFileSync(`${__dirname}/../stubs/${key}.txt`, "utf8"));
    });

    git.base.run = stub;
    return stub;
  },

  trace(obj) {
    if (obj == undefined) {
      console.log("undefined".red);
      return;
    }
    console.log(JSON.stringify(obj, null, 2).yellow);
  },
};
