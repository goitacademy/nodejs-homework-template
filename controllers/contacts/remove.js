const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await contactsOperations.removeContact(contactId);
  if (!contactToRemove)
    throw createError(404, `Contact with ${contactId} id not found`);
  res.status(200).json({
    status: "success",
    code: "200",
    message: "contact deleted",
  });
};

module.exports = remove;
