"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <div v-if="$store.getters.isDirty">
        <input type="text" placeholder="subject of your commit" v-model="subject"/>
        <textarea placeholder="optional: body of your commit" v-model="body"/></textarea>
        <button @click.prevent="commit">Commit</button>
      </div>

      <pre v-if="$store.getters.isDirty">{{ $store.state.status }}</pre>
      <span v-else>Clean, no changes...</span>

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
      this.$store.dispatch("addAll").then(() => {
        return this.$store.dispatch("commit", [this.subject, this.body]);
        this.subject = this.body = "";
      });
    },
  },
};
