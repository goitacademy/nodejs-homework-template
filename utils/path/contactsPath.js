const { createPath } = require('./createPath');
const contactsPath = createPath('../../db/contacts.json');

module.exports = {
  contactsPath,
};
