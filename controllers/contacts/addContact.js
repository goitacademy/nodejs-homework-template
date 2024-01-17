const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  if (!result) throw HttpError(404, "Bad request");

  res.status(201).json(result);
};

module.exports = addContact;