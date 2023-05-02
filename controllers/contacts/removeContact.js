const contactOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Product with id = ${contactId} not found`);
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
