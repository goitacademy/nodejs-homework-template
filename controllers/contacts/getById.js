const createError = require("http-errors");
const Contact = require("../../models/contactModel");

const getById = async (req, res) => {
  const { contactId } = req.params;

  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    throw createError(404, "Not found");
  }

  console.log("oneContact", oneContact);
  res.json(oneContact);
};

module.exports = getById;
