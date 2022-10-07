const { Contact } = require("../../models/contacts/contact");

async function listAll(_, res) {
  const contacts = await Contact.find();
  res.json(contacts);
}

module.exports = listAll;
