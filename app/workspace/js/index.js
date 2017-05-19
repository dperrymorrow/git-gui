"use strict";

const { remote } = require("electron");
const path = require("path");

window.ENV = process.env.NODE_ENV || "production";
window.ROOT = path.resolve(__dirname, "../../");
window.Vue = window.vue = window.ENV == "development" ? require("vue/dist/vue.js") : require("vue/dist/vue.min.js");
window.Vuex = require("vuex");
window.app = require("./app");

Vue.config.errorHandler = (err, vm) => {
  console.error("Error caught in Vue:", err);
  console.log(vm);
};

if (window.ENV == "development") {
  remote.getCurrentWindow().toggleDevTools({ detached: true });
  window.cssReload = require("electron-css-reload");
}
