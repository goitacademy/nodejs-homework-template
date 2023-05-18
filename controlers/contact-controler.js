const contactServis = require("../models/contacts");
const { HttpError } = require("../helper/HttpError");
const ctrlWrapper = require("../decorator/ctrlWrapper");
const Schema = require("../schemas/contact-schemas");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.find(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    throw HttpError(404, message.error);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
const addContact = async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  const { id } = req.params;
  const result = await contacts.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContacts = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.remove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete contact" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  updateContact: ctrlWrapper(updateContact),
  addContact: ctrlWrapper(addContact),
  removeContacts: ctrlWrapper(removeContacts),
};
