const { ctrlWrapper } = require("../../utils");

const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  if (!result) {
    throw HttpError(404, `Creation failed`);
  }
  res.status(201).json(result);
};

module.exports = { addContact: ctrlWrapper(addContact) };
