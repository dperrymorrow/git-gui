"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <ul>
        <li
          @click.prevent="setActive(repo.path)"
          v-for="repo in $store.state.repos"
          :class="{active: repo.path == $store.state.activeRepo}"
        >{{ repo.name }}</li>
      </ul>
      <button @click.prevent="addRepo">Add Repo</button>
    </div>
  `,

  name: "repos",

  watch: {},

  data() {
    return {};
  },

  methods: {
    setActive(path) {
      this.$store.commit("setActiveRepo", path);
    },

    addRepo() {
      dialog.showOpenDialog({ buttonLabel: "Choose Repository", properties: ["openDirectory"] }, dirs => {
        if (!dirs) return;
        this.$store.commit("addRepo", dirs[0]);
      });
    },
  },
};
