const Contact = require("../models/contact");
const { HttpError } = require("../helper/HttpError");
const ctrlWrapper = require("../decorator/ctrlWrapper");
const Schema = require("../schemas/createContactSchema");

const getAllContacts = async (req, res, next, page, limit) => {
  const skip = (page - 1) * limit;
  const result = await Contact.find(limit);
  res
    .json(result)
    .skip(skip)
    .limit(limit);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.find({ _id: id });
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    throw new HttpError(404, error.message);
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
    throw new HttpError(404, error.message);
  }
  // const { id } = req.params;
  const result = await Contact.create(req.body);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeContacts = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: id });
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json({ message: "Delete contact" });
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: id }, { status: true });
  if (!result) {
    throw new HttpError(404, "missing field favorite");
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
