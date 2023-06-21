const { Contact } = require("../../models/contacts/contacts");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = {
  listContacts,
};
