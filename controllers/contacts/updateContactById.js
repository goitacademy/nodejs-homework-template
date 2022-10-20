const contacts = require("../../models/contacts");

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  res.json(result);
};

module.exports = updateContactById;
