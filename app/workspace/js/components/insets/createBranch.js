"use strict";

const _ = require(`${ROOT}/util/lodash`);

module.exports = {
  template: `
    <div class="inset create-branch">
      <div class="form">
        <input type="text" v-model="branchName" placeholder="New Branch Name" />
        <button @click="$store.commit('clearInset')">Cancel</button> 
        <button @click="createBranch">Create {{branchName}}</button>
      </div>
    </div>
  `,

  name: "create-branch",

  data() {
    return {
      branchName: "",
    };
  },

  methods: {
    createBranch() {
      if (!_.isEmpty(this.branchName)) {
        this.$store.dispatch("createBranch", this.branchName);
        this.branchName = "";
        this.$store.commit("clearInset");
      }
    },
  },
};
