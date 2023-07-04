const { Contact } = require("../../models/contactsModels");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
  const result = await Contact.find({})
  res.status(200).json(result);
});

module.exports = getAll;