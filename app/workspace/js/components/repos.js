"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <ul>
        <li v-for="repo in $store.state.repos" :class="{active: repo.path == $store.state.activeRepo}">
          <a @click.prevent="setActive(repo.path)">
            {{ repo.name }}
          </a>
          <span v-if="repo.path == $store.state.activeRepo">
            <select @input="changeBranch" v-model="currentBranch" :disabled="$store.getters.isDirty">
              <option disabled="disabled">-- local --</option>
              <option v-for="branch in $store.state.localBranches" :value="branch">{{branch}}</option>
              <option disabled="disabled">-- remote --</option>
              <option v-for="branch in $store.state.remoteBranches" :value="branch">{{branch}}</option>
            </select>
          </span>
          <a v-else @click.prevent="removeRepo(repo.path)">x</a>
        </li>
      </ul>
      <button @click.prevent="addRepo">Add Repo</button>
    </div>
  `,

  name: "repos",

  watch: {},

  data() {
    return {};
  },

  computed: {
    currentBranch() {
      return this.$store.state.currentBranch;
    },
  },

  methods: {
    setActive(path) {
      this.$store.dispatch("changeRepo", path);
    },

    removeRepo(path) {
      this.$store.commit("removeRepo", path);
    },

    changeBranch(event) {
      this.$store.dispatch("changeBranch", event.currentTarget.value);
    },

    addRepo() {
      dialog.showOpenDialog({ buttonLabel: "Choose Repository", properties: ["openDirectory"] }, dirs => {
        if (!dirs) return;
        this.$store.commit("addRepo", dirs[0]);
        this.$store.dispatch("changeRepo", dirs[0]);
      });
    },
  },
};
