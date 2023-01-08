const { getContactById } = require("../../services/contactsService");

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) return res.json(contact);

  next();
};

module.exports = { getContactByIdController };
