const { HttpError, contactsCtrlWrapper } = require("../helpers");
const { Contact } = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  if (!result) throw HttpError(404, "Bad request");

  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json("Contact deleted");
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: contactsCtrlWrapper(getAllContacts),
  getContactById: contactsCtrlWrapper(getContactById),
  addContact: contactsCtrlWrapper(addContact),
  deleteContact: contactsCtrlWrapper(deleteContact),
  updateContact: contactsCtrlWrapper(updateContact),
  updateFavoriteContact: contactsCtrlWrapper(updateFavoriteContact),
};
