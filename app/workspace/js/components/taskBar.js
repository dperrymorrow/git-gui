"use strict";

const _ = require(`${ROOT}/util/lodash`);
const { dialog } = require("electron").remote;

module.exports = {
  name: "taskBar",

  template: `
    <div class="task-bar">

      <nav>
        <repos></repos>
        <div class="link-container">
          <button @click="$store.commit('setInset', 'create-branch')">Create Branch</button>
          <button @click.prevent="addRepo">Add Repo</button>
          <button @click="$store.dispatch('pull')">Pull</button>
          <button @click="$store.dispatch('push')">Push</button>
        </div>
      </nav>

    </div>
  `,

  data() {
    return {};
  },

  components: {
    repos: require("./repos"),
  },

  computed: {
    currentBranch() {
      return this.$store.state.currentBranch;
    },
  },

  methods: {
    addRepo() {
      dialog.showOpenDialog({ buttonLabel: "Choose Repository", properties: ["openDirectory"] }, dirs => {
        if (!dirs) return;
        this.$store.commit("addRepo", dirs[0]);
        this.$store.dispatch("changeRepo", dirs[0]);
      });
    },
  },
};
