const contacts = require("../models/contacts");
const { RequestError } = require("../helpers");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteById;
