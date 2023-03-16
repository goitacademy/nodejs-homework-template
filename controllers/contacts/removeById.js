const contactsOperations = require("../../models/contacts");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    const error = new Error(`Contact with id - ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = removeById;
