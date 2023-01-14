const { Contact } = require("../../schemas/contact");

async function getAllContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await Contact.find({}).limit(limit);
  return res.json(contacts);
}

module.exports = getAllContacts;
