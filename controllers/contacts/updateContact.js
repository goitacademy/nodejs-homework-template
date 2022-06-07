const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { body } = req;

  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, body);

  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: 200,
    data: { result },
  });
};

module.exports = updateContact;
