const contactsOperations = require("../../models/contacts");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
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

module.exports = updateById;
