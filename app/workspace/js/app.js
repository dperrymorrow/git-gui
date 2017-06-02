"use strict";

const vuexStore = require("./store");
if (ENV == "development") Vue.use(require("electron-vue-debugger"));

function start(el) {
  return vuexStore.init().then(store => {
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
        <div id="app-root" class="foo">
          <task-bar></task-bar>
          <errors v-if="$store.getters.hasErrors"></errors>
          <component :is="$store.state.inset" v-if="$store.state.inset"></component>
          <status v-if="$store.state.mode == 'status'"></status>
          <log v-else></log>
          <debugger :keepAlive="false" :components="$children" v-if="isDebug"></debugger>
        </div>
      `,
    });
  });
}

module.exports = { start };
