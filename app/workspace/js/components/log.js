"use strict";

const git = require(`${ROOT}/gitTasks`);
const dif2html = require("diff2html").Diff2Html;

module.exports = {
  template: `
    <div class="row log">

      <div class="col-md-4 col-xs-12">
        <div v-if="hasEntries" @click="selectSha(entry.sha)" class="log-entry" v-for="entry in $store.state.log">
          {{ entry.sha }}
          {{ entry.author }}
          {{ entry.date }}
          {{ entry.subject }}
          {{ entry.body }}
        </div>
      </div>

      <div
        class="col-md-8 col-xs-12"
        v-if="diff"
        v-html="diff"
      ></div>

    </div>
  `,

  name: "log",

  computed: {
    hasEntries() {
      return this.$store.state.log.length > 0;
    },
  },

  methods: {
    selectSha(sha) {
      this.chosenSha = sha;
      this.showDiff();
    },

    showDiff() {
      git
        .show(this.chosenSha)
        .then(results => {
          this.diff = dif2html.getPrettyHtml(results, {
            matching: "lines",
            showFiles: true,
            outputFormat: "line-by-line",
          });
        })
        .catch(console.error);
    },
  },

  data() {
    return {
      diff: null,
      chosenSha: null,
      action: "gitLog",
    };
  },
};
