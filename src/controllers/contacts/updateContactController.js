const {
  updateContact,
  getContactById,
} = require("../../services/contactsService");

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const updatedContact = await updateContact(contactId, _id, req.body);

  if (!updatedContact) return next();
  const contact = await getContactById(contactId, _id);

  res.json(contact);
};

module.exports = { updateContactController };
