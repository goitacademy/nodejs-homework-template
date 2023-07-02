const { Contact } = require("../../models/contactsModels");
const asyncHandler = require("express-async-handler");

const add = asyncHandler( async (req, res) => {
  const result = await Contact.create({ ...req.body });
  res.status(201).json(result);
});

module.exports = add;