const Contact = require('../../service/schemaContact');

const gettingAllContacts = async () => {
  return Contact.find();
};

module.exports = gettingAllContacts;
