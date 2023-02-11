const { Contact } = require('../../schemas/modelContact');

const listContacts = async () => {
  return await Contact.find();
};

module.exports = { listContacts };
