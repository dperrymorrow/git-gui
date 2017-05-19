"use strict";

const _ = require(`${ROOT}/util/lodash`);

module.exports = {
  name: "taskBar",

  template: `
    <div>
      <button @click="$store.dispatch('pull')">Pull</button>
      <button @click="$store.dispatch('push')">Push</button>

      <div v-if="!$store.getters.isDirty">
        <input type="text" v-model="branchName" placeholder="New Branch Name" />
        <button @click="createBranch">Create Branch</button>
      </div>
    </div>
  `,

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
      }
    },
  },
};
