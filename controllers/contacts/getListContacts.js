const Contact   = require("../../models/contacts");

const getListContacts = async (req, res, next) => {
  const { limit = 20, page = 1 } = req.body;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({}).skip(skip).limit(limit);
  res.status(200).json(contacts);
};

module.exports = getListContacts;