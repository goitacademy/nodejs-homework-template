const { Contact } = require("../../models/book");

// const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../../decorators");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
module.exports = {
  addContact: ctrlWrapper(addContact),
};
