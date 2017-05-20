"use strict";

const vuexStore = require("./store");
if (ENV == "development") Vue.use(require("electron-vue-debugger"));

function start(el) {
  return vuexStore.init().then(store => {
    // routerSync.sync(store, router);

    return new Vue({
      el: el,
      store,
      // router,

      computed: {
        isDebug() {
          return ENV == "development";
        },
      },

      components: {
        log: require("./components/log"),
        status: require("./components/status"),
        errors: require("./components/errors"),
        "task-bar": require("./components/taskBar"),
        "create-branch": require("./components/insets/createBranch"),
      },

      template: `
        <div id="app-root">
          <task-bar></task-bar>
          <errors></errors>
          <component :is="$store.state.inset" v-if="$store.state.inset"></component>
          <status></status>
          <log></log>
          <debugger :keepAlive="false" :components="$children" v-if="isDebug"></debugger>
        </div>
      `,
    });
  });
}

module.exports = { start };
