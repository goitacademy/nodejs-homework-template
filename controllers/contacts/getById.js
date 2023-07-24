const contacts = require("../../models/contacts");

const getById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.contactId);
  res.json(contact);
};

module.exports = getById;
