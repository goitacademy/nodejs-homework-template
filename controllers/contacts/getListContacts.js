const { Contact } = require("../../db/contactModel");
async function getListContacts(req, res, next) {
  const contacts = await Contact.find({});
  res.json({ data: contacts });
}
module.exports = { getListContacts };
