const createError = require("../../helpers/createError");
const { updateContact } = require("../../models/contactsModel");

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const body = req.query;
  const contact = await updateContact(id, body);
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  res.status(200).json(contact);
};

module.exports = updateById;
