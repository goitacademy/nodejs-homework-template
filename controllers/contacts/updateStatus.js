const { changeStatus } = require("../../services/contactsService");
const { joiSchema } = require("../../models/contact");
const asyncHandler = require("express-async-handler");

const updateStatus = asyncHandler(async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === null) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  const updatedContact = await changeStatus(contactId, { favorite });

  !updatedContact
    ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
    : res.status(200).json(updatedContact);
});

module.exports = {
  updateStatus,
};
