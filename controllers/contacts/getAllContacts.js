const { Contacts } = require("../../model");

const getAllContacts = async (req, res) => {
  const contacts = await Contacts.find({});
  res.status(200).res.json(contacts);
};

module.exports = getAllContacts;
