const { removeContact } = require("../../services/contactsService");

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await removeContact(contactId, _id);
  if (!contact) return next();
  res.json({ message: `contact ${contact.name} is deleted` });
};

module.exports = { removeContactController };
