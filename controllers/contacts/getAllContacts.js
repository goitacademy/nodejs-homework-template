const { Contact } = require("../../model");

const getAllContacts = async (_req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
};
module.exports = getAllContacts;
