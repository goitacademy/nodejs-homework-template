const { Contact } = require('../schemas/contact');

const listContacts = async () => {
  return await Contact.find();
};

module.exports = { listContacts };
