"use strict";

const git = require(`${ROOT}/gitTasks`);
const dif2html = require("diff2html").Diff2Html;

module.exports = {
  template: `
    <div class="log">

        <div v-if="hasEntries">
          <div @click="selectSha(entry.sha)" class="log-entry" v-for="entry in $store.state.log">
            {{ entry.sha }}
            {{ entry.author }}
            {{ entry.date }}
            {{ entry.subject }}
            {{ entry.body }}

            <div v-if="diff && entry.sha == chosenSha" v-html="diff"></div>
          </div>

      </div>

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
          this.diff = dif2html.getPrettyHtml(results, { words: true });
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
