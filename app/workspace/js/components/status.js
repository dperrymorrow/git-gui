"use strict";

const { dialog } = require("electron").remote;

module.exports = {
  template: `
    <div>
      <pre>{{ $store.state.status }}</pre>
    </div>
  `,

  name: "status",

  data() {
    return {
      loading: false,
    };
  },

  watch: {
    activeRepo() {
      this.reload();
    },
  },

  created() {
    this.reload();
  },

  computed: {
    activeRepo() {
      return this.$store.state.activeRepo;
    },
  },

  methods: {
    reload() {
      this.loading = true;
      this.$store.dispatch("gitStatus").then(status => {
        this.loading = false;
      });
    },
  },
};
