const { Contact } = require('../../models');

const getAllContacts = async (_, res) => {
  const contacts = await Contact.find({}, '-createdAt -updatedAt');

  res.json(contacts);
};

module.exports = getAllContacts;