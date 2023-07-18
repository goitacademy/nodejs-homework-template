const { removeContact } = require("../../services/contactsService");
const asyncHandler = require("express-async-handler");

const deleteContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await removeContact(contactId);

  !deletedContact
    ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
    : res.status(201).json(`Contact by ID ${contactId}: deleted`);
});

module.exports = {
  deleteContact,
};
