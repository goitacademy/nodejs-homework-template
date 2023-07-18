const { changeContact } = require("../../services/contactsService");
const { joiSchema } = require("../../models/contact");
const asyncHandler = require("express-async-handler");

const updateContact = asyncHandler(async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { contactId } = req.params;
  const contact = req.body;
  const updatedContact = await changeContact(contactId, contact);

  !updatedContact
    ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
    : res.status(200).json(updatedContact);
});

module.exports = {
  updateContact,
};
