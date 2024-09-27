const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({ status: "succsess", code: 200, data: { contact } });
};

module.exports = getContactById;