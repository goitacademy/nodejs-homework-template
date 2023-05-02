const contactOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperations.updateContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.status(200).json(result);
};

module.exports = updateContact;
