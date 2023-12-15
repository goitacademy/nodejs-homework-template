// const contacts = require("../models/contacts");
const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContact = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};
const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};
const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json({ message: "contact deleted" });
};
module.exports = {
  listContact: ctrlWrapper(listContact),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
