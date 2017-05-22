"use strict";

const dif2html = require("diff2html").Diff2Html;

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
