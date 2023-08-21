const { Contact } = require("../../models/contacts");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
});

module.exports = getAll;
