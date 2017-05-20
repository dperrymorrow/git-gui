"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <div class="row">

        <div class="col-xs-4">
          <div v-if="$store.getters.isDirty">
            <div :class="file.status.toLowerCase()" v-for="file in $store.state.status">
              {{ file.status }} {{ file.file }}
            </div>
          </div>
          <span v-else>Clean, no changes...</span>

          <div v-if="$store.getters.isDirty">
            <input type="text" placeholder="subject of your commit" v-model="subject"/>
            <textarea placeholder="optional: body of your commit" v-model="body"/></textarea>
            <button @click.prevent="commit">Commit to {{ $store.state.currentBranch }}</button>
          </div>
        </div>

        <div class="col-xs-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>

      </div>
    </div>
  `,

  name: "status",

  data() {
    return {
      subject: "",
      body: "",
    };
  },

  methods: {
    commit() {
      this.$store
        .dispatch("addAll")
        .then(() => {
          return this.$store.dispatch("commit", [this.subject, this.body]);
        })
        .then(() => {
          this.subject = this.body = "";
        });
    },
  },
};
