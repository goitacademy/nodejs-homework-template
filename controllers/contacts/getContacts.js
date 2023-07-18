const { getContactsAll } = require("../../services/contactsService");
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;
  const contacts = await getContactsAll(_id, page, limit, favorite);

  res.status(200).json(contacts);
});

module.exports = {
  getContacts,
};
