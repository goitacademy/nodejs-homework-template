const {
  updateContact,
  getContactById,
} = require("../../services/contactsService");

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) return next();
  const contact = await getContactById(contactId);
  res.json(contact);
};

module.exports = { updateContactController };
