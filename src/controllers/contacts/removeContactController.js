const { removeContact } = require("../../services/contactsService");

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) return next();
  res.json({ message: `contact ${contact.name} is deleted` });
};

module.exports = { removeContactController };
