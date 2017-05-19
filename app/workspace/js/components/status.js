"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <span v-if="hasChanges">Clean, no changes...</span>
      <pre v-else>{{ $store.state.status }}</pre>
    </div>
  `,

  name: "status",

  computed: {
    hasChanges() {
      return Object.keys(this.$store.state.status).length > 0;
    },
  },

  data() {
    return {
      action: "gitStatus",
    };
  },
};
