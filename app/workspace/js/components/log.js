"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <pre v-if="hasEntries">{{ $store.state.log }}</pre>
      <span v-else>no log entries...</span>
    </div>
  `,

  name: "log",

  computed: {
    hasEntries() {
      return this.$store.state.log.length > 0;
    },
  },
  data() {
    return {
      action: "gitLog",
    };
  },
};
