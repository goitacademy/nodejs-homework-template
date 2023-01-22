const { Contacts } = require("../../db/contactsModel");
async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await new Contacts({ name, email, phone });
  await newContact.save();
  res.status(201).json(newContact);
}

module.exports = {
  createContact,
};
