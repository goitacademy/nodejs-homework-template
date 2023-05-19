const Contact = require("../models/contact");
const HttpError = require("../helper/HttpError");
const ctrlWrapper = require("../decorator/ctrlWrapper");
const Schema = require("../schemas/contact-schemas");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.find({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(201).json(result);
};

const addContact = async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  // const { id } = req.params;
  const result = await Contact.create(req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeContacts = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete contact" });
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: id }, { status: true });
  if (!result) {
    throw HttpError(404, "missing field favorite");
  }
  res.status(200).json({ message: "Status contact" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  updateContact: ctrlWrapper(updateContact),
  addContact: ctrlWrapper(addContact),
  removeContacts: ctrlWrapper(removeContacts),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
