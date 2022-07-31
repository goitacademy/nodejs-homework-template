const { Contact } = require("../../models/contacts");
const { NotFound } = require("http-errors");
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new NotFound("Not found");
  }
  res.status(200).json(contact);
};

module.exports = getById;
