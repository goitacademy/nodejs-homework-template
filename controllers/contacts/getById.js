const { createError } = require("../../helpers");
const { Contact } = require("../../models/contactModel");

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = getById;
