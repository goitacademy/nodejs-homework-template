const Contact = require("../models/contact");
const { RequestError } = require("../helpers");
const { addSchema, updateFavoriteSchema } = require("../schemas/contacts");

const getAll = async (req, res, next) => {
  const result = await Contact.find({}, "name email phone");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.create(req.body);
  return res.status(201).json(result);
};

const update = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateFavoriteById = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteContact,
  updateFavoriteById,
};
