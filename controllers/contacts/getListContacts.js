const { Contact } = require("../../models/contacts");

const getListContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

module.exports = getListContacts;