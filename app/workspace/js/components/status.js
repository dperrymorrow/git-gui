"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>

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
