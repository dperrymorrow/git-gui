"use strict";

const { dialog } = require("electron").remote;
const git = require(`${ROOT}/gitTasks`);
const dif2html = require("diff2html").Diff2Html;

module.exports = {
  template: `
    <div class="status">

      <div class="file-list">

        <div v-if="$store.getters.isDirty">
          <div class="file" @click="selectFile(file.file)" :class="file.status.toLowerCase()" v-for="file in $store.state.status">
            <span class="badge" :class="file.status.toLowerCase()">{{ file.status.charAt(0) }}</span>
            {{ file.file }}</td>
          </div>
        </div>

        <div class="commit-box" v-if="$store.getters.isDirty">
          <input type="text" placeholder="subject of your commit" v-model="subject"/>
          <textarea placeholder="optional: body of your commit" v-model="body"/></textarea>
          <button class="" @click.prevent="commit">
            <i class="octicon octicon-git-commit"></i>
            Commit to {{ $store.state.currentBranch }}
          </button>
        </div>

        <span v-else>Clean, no changes...</span>
      </div>


      <div v-if="fileDiff" v-html="fileDiff"></div>

    </div>
  `,

  name: "status",

  data() {
    return {
      selectedFile: null,
      fileDiff: null,
      subject: "",
      body: "",
    };
  },

  mounted() {
    setInterval(() => {
      this.$store.dispatch("gitStatus");
      if (this.selectedFile) this.showDiff();
    }, 4000);
  },

  methods: {
    showDiff() {
      git
        .fileDiff([this.selectedFile])
        .then(results => {
          // this.fileDiff = dif2html.getJsonFromDiff(results, { words: true });
          this.fileDiff = dif2html.getPrettyHtml(results, { words: true });
        })
        .catch(console.error);
    },

    selectFile(file) {
      this.selectedFile = file;
      this.showDiff();
    },

    commit() {
      this.$store
        .dispatch("addAll")
        .then(() => {
          return this.$store.dispatch("commit", [this.subject, this.body]);
        })
        .then(() => {
          this.subject = this.body = "";
        });
    },
  },
};
