const contactsOperation = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateContact(contactId, req.body);
  if (!result) {
    const error = new Error(`Product with ${contactId} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
