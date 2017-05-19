"use strict";

module.exports = {
  name: "taskBar",

  template: `
    <div>
      <button @click="$store.dispatch('pull')">Pull</button>
      <button @click="$store.dispatch('push')">Push</button>
    </div>
  `,
};
