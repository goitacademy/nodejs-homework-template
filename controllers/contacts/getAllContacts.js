const { Contact } = require("../../models/contact");

const getAllContacts = async (_, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

module.exports = getAllContacts;
