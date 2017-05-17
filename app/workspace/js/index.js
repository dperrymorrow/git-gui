"use strict";

const { remote } = require("electron");

window.ENV = process.env.NODE_ENV || "production";
window.Vue = window.vue = window.ENV == "development" ? require("vue/dist/vue.js") : require("vue/dist/vue.min.js");
window.Vuex = require("vuex");
window.app = require("./app");

Vue.config.errorHandler = (err, vm) => {
  console.error("Error caught in Vue:", err);
  console.log(vm);
};

if (window.ENV == "development") {
  require("electron-vue-debugger");
  remote.getCurrentWindow().toggleDevTools({ detached: true });
  window.cssReload = require("electron-css-reload");
}
