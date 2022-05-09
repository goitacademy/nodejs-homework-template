const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

module.exports = removeContact;
