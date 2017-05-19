"use strict";

module.exports = {
  template: `
    <div>
      <div class="error" v-for="error in $store.state.errors">
        <pre>{{ error }}</pre>
      </div>
      <button v-if="$store.getters.hasErrors" @click="clear">Clear Errors</button>
    </div>
  `,

  name: "errors",

  methods: {
    clear() {
      this.$store.commit("clearErrors");
    },
  },
};
