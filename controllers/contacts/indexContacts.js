const { listContacts } = require("../../models/contacts");

async function indexContacts(req, res, next) {
  const contacts = await listContacts();
  return res.json(contacts);
}

module.exports = { indexContacts };
