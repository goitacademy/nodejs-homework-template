const asyncHandler = require("express-async-handler");
const contactsModel = require("../../models/contactsModel");

const addContact = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
      res.status(400);
      throw new Error("Provide all filds!");
  }
  const contact = await contactsModel.create({ ...req.body });
  res.status(201).json({ code: 201, data: contact });
  // res.send("addContact");
});

module.exports = addContact;
