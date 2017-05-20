"use sctrict";

module.exports = {
  template: `
    <div class="selector">
      <a class="selected" @click="toggle">
        <i v-if="icon" :class="iconClass"></i>
        {{ selected }}
        <i v-if="open" class="octicon octicon-triangle-up"></i>
        <i v-else class="octicon octicon-triangle-down"></i>
      </a>


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
    icon: {
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

  computed: {
    iconClass() {
      return this.icon ? `octicon octicon-${this.icon}` : "";
    },
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
