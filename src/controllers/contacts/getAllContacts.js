const { Contact } = require("../../schemas/contact");

async function getAllContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await Contact.find({ owner: req.user.id })
    .select({ __v: 0, owner: 0 })
    .limit(limit);
  return res.json(contacts);
}

module.exports = getAllContacts;
