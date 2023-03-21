const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await contactsOperations.removeContact(contactId);
  if (!removedContact) {
    const error = new Error(`Contact with id: ${contactId} is not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: removedContact,
    },
  });
};

module.exports = removeContact;
