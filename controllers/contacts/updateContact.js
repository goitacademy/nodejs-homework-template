const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404, `Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

module.exports = updateContact;
