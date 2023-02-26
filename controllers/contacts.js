// -----------------------------------------------------
//                 Controllers
// -----------------------------------------------------
const contacts = [];
const { ctrlWrapper, HttpError } = require("../utils");
const Contact = require("../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json({
    code: 200,
    result: result,
  });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.contactId);
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
  const contact = await contacts.addContact(body);
  res.status(201).json({ code: 201, result: contact });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removeContact = await contacts.removeContact(contactId);
  if (!removeContact) {
    throw HttpError(404, "Not found");
  }
  res.json({ code: 200, message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const putContact = await contacts.updateContact(contactId, req.body);
  if (!putContact) {
    throw HttpError(404, "Not found");
  }
  res.json({ code: 200, result: putContact });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
