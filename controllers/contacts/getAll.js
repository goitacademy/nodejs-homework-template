const asyncHandler = require("express-async-handler");
const contactsModel = require("../../models/contactsModel");

const getAll = asyncHandler(async (req, res) => {
  const allContacts = await contactsModel.find({});
  res
    .status(200)
    .json({ code: 200, data: allContacts, qty: allContacts.length });
  // res.send("getAll");
});
  
module.exports = getAll;
