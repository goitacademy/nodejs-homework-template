const asyncHandler = require("express-async-handler");
const contactsModel = require("../../models/contactsModel");

const getById = asyncHandler(async (req, res) => {
  const contact = await contactsModel.findById(req.params.id);
  res.status(200).json({ code: 200, data: contact });
  // res.send("getById");
});

module.exports = getById;
