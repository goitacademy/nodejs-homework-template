const { getContacts } = require("../services/contactsService");
const asyncHandler = require("express-async-handler");

const getContactsController = asyncHandler(async (req, res) => {
  const contacts = await getContacts();

  res.status(200).json(contacts);
});

module.exports = {
  getContactsController,
};
