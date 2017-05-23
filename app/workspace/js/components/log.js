"use strict";

const dif2html = require("diff2html").Diff2Html;

module.exports = {
  template: `
    <div class="row">
      <div class="col-xs-4">
        <pre v-if="hasEntries">{{ $store.state.log }}</pre>
        <span v-else>no log entries...</span>
      </div>
      <div class="col-xs-8">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
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
