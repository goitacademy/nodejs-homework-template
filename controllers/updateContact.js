const { updateContact } = require("../services/contactsService");
const { schema } = require("../schemas/joiSchema");
const asyncHandler = require("express-async-handler");

const updateContactController = asyncHandler(async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { contactId } = req.params;
  const contact = req.body;
  const updatedContact = await updateContact(contactId, contact);

  !updatedContact
    ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
    : res.status(200).json(updatedContact);
});

module.exports = {
  updateContactController,
};
