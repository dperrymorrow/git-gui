"use strict";

const _ = require(`${ROOT}/util/lodash`);
const { dialog } = require("electron").remote;

module.exports = {
  name: "taskBar",

  template: `
    <div class="task-bar">

      <nav class="main">
        <repos></repos>
        <div class="link-container">
          <button @click="$store.commit('setInset', 'create-branch')">
          <i class="octicon octicon-plus"></i>
          <i class="octicon octicon-git-branch"></i>
          </button>
          <button @click.prevent="addRepo">
            <i class="octicon octicon-plus"></i>
            <i class="octicon octicon-repo"></i>
          </button>
          <button @click="$store.dispatch('pull')">
            <i class="octicon octicon-repo-pull"></i>
          </button>
          <button @click="$store.dispatch('push')">
            <i class="octicon octicon-repo-push"></i>
          </button>
        </div>
      </nav>

      <ul class="tabs">
        <li :class="{active: $store.state.mode == 'status'}">
          <a @click.prevent="$store.commit('setMode', 'status')">
            <i class="octicon octicon-diff"></i>
            Changed
          </a>
        </li>
        <li :class="{active: $store.state.mode == 'history'}">
          <a @click.prevent="$store.commit('setMode', 'history')">
            <i class="octicon octicon-history"></i>
            History
          </a>
        </li>
      </ul>

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
      dialog.showOpenDialog(
        { buttonLabel: "Choose Repository", properties: ["openDirectory"] },
        dirs => {
          if (!dirs) return;
          this.$store.commit("addRepo", dirs[0]);
          this.$store.dispatch("changeRepo", dirs[0]);
        }
      );
    },
  },
};
