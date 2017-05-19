"use strict";

module.exports = {
  isDirty(state) {
    return state.status.length > 0;
  },

  hasErrors(state) {
    return state.errors.length > 0;
  },
};
