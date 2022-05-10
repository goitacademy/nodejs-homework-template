const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.json(removedContact);
};

module.exports = removeContact;
