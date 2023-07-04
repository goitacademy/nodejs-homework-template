const { getContactById } = require("../services/contactsService");
const asyncHandler = require("express-async-handler");

const getContactByIdController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  !contactById
    ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
    : res.status(200).json(contactById);
});

module.exports = {
  getContactByIdController,
};
