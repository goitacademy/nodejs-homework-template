const messages = {
  messageRequireField(field) {
    return `Field ${field} is require`;
  },
  messageEmptyField(field) {
    return `Field ${field} cant be empty string`;
  },

  'unknown-field': 'Invalid fields {{#child}}',
};

module.exports = { messages };
