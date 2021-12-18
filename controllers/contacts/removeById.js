const { NotFound } = require("http-errors");

const contactsOperations = require("../../model/contactsOperations");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({ message: `Contact with id=${contactId} deleted` });
};

module.exports = removeById;
