const contacts = require("../models/contacts");
const { ctrlWrapper, HttpError } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.find();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.create(req.body);

  const response = {
    id: result.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  res.status(201).json(response);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
