"use sctrict";

module.exports = {
  template: `
    <div class="selector">
      <a class="selected" @click="toggle">{{ selected }}</a>
      <ul :class="{ active: open }">
        <li
          @click="select(item)"
          v-for="item in items"
          v-if="item != selected"
          :class="{ active: selected == item }"
        >
          {{ item }}
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
