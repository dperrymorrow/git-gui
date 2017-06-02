"use strict";

module.exports = {
  template: `
    <div class="error">
      <pre v-for="error in $store.state.errors">{{ error.stderr }}</pre>
      <button @click="clear" class="red sm">Clear Errors</button>
    </div>
  `,

  name: "errors",

  methods: {
    clear() {
      this.$store.commit("clearErrors");
    },
  },
};
