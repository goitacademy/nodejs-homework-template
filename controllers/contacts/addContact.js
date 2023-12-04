const { Contact } = require("../../models/contact");

// const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../../decorators");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
module.exports = {
  addContact: ctrlWrapper(addContact),
};
