const Contact = require('../../models/contact.js');

const getAllContacts = async () => {
    return Contact.find();
  };

  module.exports = {getAllContacts};
