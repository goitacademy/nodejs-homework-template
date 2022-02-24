const Contact = require('../../service/schemaContact');

const addingContact = async body => {
  return Contact.create({ ...body });
};

module.exports = addingContact;
