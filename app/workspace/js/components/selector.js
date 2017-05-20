"use sctrict";

module.exports = {
  template: `
    <div class="selector">
      <a class="selected" @click="toggle">{{ selected }}</a>

      <span v-if="open" class="octicon octicon-triangle-down"></span>
      <span v-else class="octicon octicon-triangle-right"></span>

      <ul :class="{ active: open }">
        <li

          v-for="item in items"
          v-if="item != selected"
          :class="{ active: selected == item }"
        >
          <a @click="select(item)">{{ item }}</a>
        </li>
      </ul>
    </div>
  `,

  props: {
    selected: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      open: false,
    };
  },

  methods: {
    select(item) {
      this.open = false;
      this.$emit("selected", item);
    },
    toggle() {
      this.open = !this.open;
    },
  },
};
