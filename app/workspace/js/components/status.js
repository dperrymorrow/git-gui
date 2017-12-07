"use strict";

const { dialog } = require("electron").remote;
const git = require(`${ROOT}/gitTasks`);
const dif2html = require("diff2html").Diff2Html;
const fs = require("fs");

module.exports = {
  template: `
    <div class="status">

    <div class="form commit-box" v-if="$store.getters.isDirty">
      <input type="text" placeholder="subject of your commit" v-model="subject"/>
      <textarea placeholder="optional: body of your commit" v-model="body"/></textarea>
      <button class="dangle" @click.prevent="commit">
        <i class="octicon octicon-git-commit"></i>
        Commit to {{ $store.state.currentBranch }}
      </button>
    </div>

      <div class="file-list">
        <div v-if="$store.getters.isDirty">
          <div class="file" @click="selectFile(file.file)" :class="{active: file.file == selectedFile}" v-for="file in $store.state.status">
            <span class="badge" :class="file.status.toLowerCase()">{{ file.status.charAt(0) }}</span>
            {{ file.file }}</td>
          </div>
        </div>
        <span v-else>Clean, no changes...</span>
      </div>

      <div id="diff" v-html="diff"></div>

    </div>
  `,

  name: "status",

  data() {
    return {
      selectedFile: null,
      diff: null,
      subject: "",
      body: "",
    };
  },

  watch: {
    curRepo() {
      this.refresh();
    },
  },

  computed: {
    curRepo() {
      return this.$store.state.activeRepo;
    },
    curBranch() {
      return this.$store.state.currentBranch;
    },
  },

  mounted() {
    fs.watch(
      this.$store.state.activeRepo,
      { persistent: true, recursive: true },
      (event, filename) => {
        if (filename.includes(".git/")) return;
        this.refresh();
      }
    );
    this.refresh();
  },

  methods: {
    async refresh() {
      this.$store.dispatch("gitStatus");

      if (this.selectedFile) {
        this.showDiff();
      } else {
        const diff = await git.statusDiff();
        this.diff = dif2html.getPrettyHtml(diff, { words: true, showFiles: false });
      }
    },

    // highlight() {
    //   Array.from(this.$el.querySelectorAll(".d2h-code-line-ctn")).forEach(item => {
    //     item.innerHTML = Prism.highlight(item.innerHTML, Prism.languages.javascript);
    //     console.log(item.innerHTML);
    //   });
    // },

    async showDiff() {
      const results = await git.fileDiff(this.selectedFile);

      this.diff = dif2html.getPrettyHtml(results, {
        matching: "none",
        outputFormat: "line-by-line",
      });
    },

    selectFile(file) {
      this.selectedFile = file;
      this.showDiff();
    },

    async commit() {
      await this.$store.dispatch("addAll");
      await this.$store.dispatch("commit", [this.subject, this.body]);

      this.refresh();
      this.subject = this.body = "";
    },
  },
};
