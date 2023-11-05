const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  if (!result) throw HttpError(404, "Bad request");

  res.status(201).json(result);
};

module.exports = addContact;
