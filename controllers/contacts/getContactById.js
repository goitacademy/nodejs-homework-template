const { getById } = require("../../services/contactsService");
const asyncHandler = require("express-async-handler");

const getContactById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getById(contactId);

  !contactById
    ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
    : res.status(200).json(contactById);
});

module.exports = {
  getContactById,
};
