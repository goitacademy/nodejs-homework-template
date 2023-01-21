const { Contact } = require("../../schemas/contact");

async function getAllContacts(req, res, next) {
  const { page = 1, limit = 20, favorite = null } = req.query;
  if (favorite) {
    console.log(page, limit, favorite);
  }
  const contacts = await Contact.find({ owner: req.user.id })
    .select({ __v: 0, owner: 0 })
    .limit(limit);
  return res.json(contacts);
}

module.exports = getAllContacts;
