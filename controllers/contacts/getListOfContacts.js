const { Contact } = require("../../models/contacts");

async function getListOfContacts(req, res, next) {
  const { limit = 5, page = 1, favorite } = req.query;
  const { _id } = req.user;
  if (!favorite) {
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: _id }).skip(skip).limit(limit);
    return res.status(200).json(contacts);
  }
  const contacts = await Contact.find({ owner: _id, favorite })
    .skip(skip)
    .limit(limit);
  return res.status(200).json(contacts);
}

module.exports = {
  getListOfContacts,
};
