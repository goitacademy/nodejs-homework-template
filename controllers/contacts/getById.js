const contactsOperations = require("../../models/contacts");

const getById = async (req, res) => {
  const contact = await contactsOperations.getContactById(req.params.contactId);
  res.json(contact);
};

module.exports = getById;
