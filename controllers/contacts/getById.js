const createError = require("http-errors");
const contacts = require("../../models/contacts");

const getById = async (req, res) => {
  console.log("req.params", req.params);
  const { contactId } = req.params;
  const oneContact = await contacts.getContactById(contactId);
  if (!oneContact) {
    throw createError(404, "Not found");
  }

  console.log("oneContact", oneContact);
  res.json(oneContact);
};

module.exports = getById;
