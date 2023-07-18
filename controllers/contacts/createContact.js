const { addNewContact } = require("../../services/contactsService");
const { joiSchema } = require("../../models/contact");
const asyncHandler = require("express-async-handler");

const createContact = asyncHandler(async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { _id } = req.user;
  const contact = req.body;

  const newContact = await addNewContact(contact, _id);

  res.status(201).json(newContact);
});

module.exports = {
  createContact,
};
