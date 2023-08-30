const asyncHandler = require("express-async-handler");
const contactsModel = require("../../models/contactsModel");

const remove = asyncHandler(async (req, res) => {
  const contact = await contactsModel.findByIdAndRemove(req.params.id);
  res.status(200).json({ code: 200, data: contact });
  // res.send("remove");
});

module.exports = remove;
