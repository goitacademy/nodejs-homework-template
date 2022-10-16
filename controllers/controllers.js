const Contact = require("../models/contactsModel");
const RequestError = require("../helpers/RequestError");

const schema = require("../schemas/schemas");

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(400, "Not found");
  }
  res.status(200).json(result);
};

const addItem = async (req, res, next) => {
  const newContact = req.body;
  const { error } = schema.newContact.validate(newContact);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.create(newContact);
  res.status(201).json(result);
};

const removeItem = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" });
};

const updateItem = async (req, res, next) => {
  const updatedContact = req.body;
  const id = req.params.contactId;
  const { error } = schema.updateContact.validate(updatedContact);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.findByIdAndUpdate(id, updatedContact, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateFavoriteField = async (req, res, next) => {
  const updatedInfo = req.body;
  const id = req.params.contactId;
  const { error } = schema.favoriteContact.validate(updatedInfo);
  if (error) {
    throw RequestError(404, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(id, updatedInfo, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  addItem,
  removeItem,
  updateItem,
  updateFavoriteField,
};
