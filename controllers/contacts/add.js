const contacts = require("../../models/contacts.js");
const { RequestError } = require("../../helpers");

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await contacts.addContact(name, email, phone);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};
module.exports = addContact;
