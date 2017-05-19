"use strict";

module.exports = {
  isDirty(state) {
    return state.status.length > 0;
  },
};
