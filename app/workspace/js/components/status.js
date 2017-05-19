"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <div v-if="$store.getters.isDirty">
        <input type="text" placeholder="subject of your commit" v-model="subject"/>
        <input type="text" placeholder="optional: body of your commit" v-model="body"/>
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
      });
    },
  },
};
