"use strict";

module.exports = {
  template: `
    <div class="repos">

      <selector
        :items="$store.getters.repoNames"
        :selected="$store.getters.activeRepoName"
        @selected="changeRepo"
      ></selector>

      <selector
        :items="$store.getters.allBranches"
        :selected="$store.state.currentBranch"
        @selected="changeBranch"
      ></selector>

    </div>
  `,

  name: "repos",
  components: {
    selector: require("./selector"),
  },
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
    changeRepo(name) {
      const path = this.$store.state.repos.find(repo => repo.name == name).path;
      this.$store.dispatch("changeRepo", path);
    },
    changeBranch(branch) {
      this.$store.dispatch("changeBranch", branch);
    },
    removeRepo(path) {
      this.$store.commit("removeRepo", path);
    },
  },
};
