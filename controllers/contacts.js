const { Contact } = require("../models/contacts");
const { schemas } = require("../schemas/contacts");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
});

const getById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(result);
});

const addContact = asyncHandler(async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

const removeById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    message: "contact deleted",
  });
});

const updateById = asyncHandler(async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(result);
});

const updateStatusContact = asyncHandler(async (req, res, next) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    error.status = 404;
    throw error;
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    const error = new Error("missing field favorite");
    error.status = 400;
    throw error;
  }
  res.json(result);
});

module.exports = {
  getAll,
  getById,
  addContact,
  removeById,
  updateById,
  updateStatusContact,
};
