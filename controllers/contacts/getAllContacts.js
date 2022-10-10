const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  res.json(data);
};

module.exports = getAllContacts;
