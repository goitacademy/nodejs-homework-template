const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

async function createContact(req, res, next) {
  const newContact = await Contact.create(req.body);
  if (!newContact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(201).json(newContact);
}

module.exports = {
  createContact,
};
