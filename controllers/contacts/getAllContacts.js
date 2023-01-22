const { Contacts } = require("../../db/contactsModel");

async function getAllContacts(req, res) {
  const contacts = await Contacts.find();
  res.json({ contacts });
}

module.exports = {
  getAllContacts,
};
