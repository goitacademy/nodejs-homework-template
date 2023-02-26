// -----------------------------------------------------
//                 Controllers
// -----------------------------------------------------
const contacts = require("../models/contacts");
const { ctrlWrapper, HttpError } = require("../utils");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json({
    code: 200,
    result: result,
  });
};

const getContactById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    result: contact,
  });
};

const addContact = async (req, res) => {
  const body = req.body;
  const { error } = addSchema.validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const contact = await contacts.addContact(body);
  res.status(201).json({ code: 201, result: contact });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
};
