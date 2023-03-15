const Contact  = require("../../models/contacts");

const getListContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};
module.exports = getListContacts;