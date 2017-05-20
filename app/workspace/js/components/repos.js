"use strict";

module.exports = {
  template: `
    <div class="repos">

      <selector
        :items="$store.getters.repoNames"
        :selected="$store.getters.activeRepoName"
        @selected="changeRepo"
      ></selector>

      <ul>
        <li v-for="repo in $store.state.repos" :class="{active: repo.path == $store.state.activeRepo}">
          <a @click.prevent="changeRepo(repo.path)">
            {{ repo.name }}
          </a>


          <span v-if="repo.path == $store.state.activeRepo">
            <select @input="changeBranch" v-model="currentBranch">
              <option disabled="disabled">-- default --</option>
              <option :value="$store.state.defaultBranch">{{$store.state.defaultBranch}}</option>
              <option disabled="disabled">-- local --</option>
              <option v-for="branch in $store.state.localBranches" :value="branch">{{branch}}</option>
              <option disabled="disabled">-- remote --</option>
              <option v-for="branch in $store.state.remoteBranches" :value="branch">{{branch}}</option>
            </select>
          </span>

          <a v-else @click.prevent="removeRepo(repo.path)">x</a>
        </li>
      </ul>
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
    changeBranch(event) {
      this.$store.dispatch("changeBranch", event.currentTarget.value);
    },
    removeRepo(path) {
      this.$store.commit("removeRepo", path);
    },
  },
};
