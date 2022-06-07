const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw createError(404, `Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: result,
    },
  });
};

module.exports = removeContact;
