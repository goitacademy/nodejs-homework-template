const { listContacts } = require("../../models/contacts");
const successRes = require("./successRes");

async function getContactsController(req, res) {
  const contacts = await listContacts();

  res.json(successRes(contacts));
}

module.exports = getContactsController;
