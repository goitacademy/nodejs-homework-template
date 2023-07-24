const contacts = require("../../models/contacts");

const updateById = async (req, res) => {
  const contact = await contacts.updateContact(req.params.contactId, req.body);
  res.json(contact);
};

module.exports = updateById;
