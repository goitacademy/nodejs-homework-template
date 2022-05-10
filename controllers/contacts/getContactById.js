const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.json(contact);
};

module.exports = getContactById;
