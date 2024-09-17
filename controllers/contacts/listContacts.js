const Contact = require("../../models");

const listContacts = async (_, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

module.exports = listContacts;
