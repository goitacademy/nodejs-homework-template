const { Contact } = require("../../schemas/contact");

async function getAllContacts(req, res, next) {
  const { page = 1, limit = 20, favorite = null } = req.query;

  let skip = 0;
  if (page > 0 && limit > 0) {
    skip = (page - 1) * limit;
  }
  const searchParam =
    favorite === "true" || favorite === "false"
      ? { owner: req.user.id, favorite: favorite }
      : { owner: req.user.id };

  const contacts = await Contact.find(searchParam)
    .select({ __v: 0, owner: 0 })
    .skip(skip)
    .limit(limit > 0 ? limit : 20);
  return res.json(contacts);
}

module.exports = getAllContacts;
