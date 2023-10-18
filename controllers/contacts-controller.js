const { Contact } = require("../models/Contact.js");

const HttpError = require("./../helpers/HttpError.js");

const ctrlWrapper = require("../decorators/ctrlWrapper.js");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    res.status(404);
    throw HttpError(404, `Not found with id: ${contactId}`);
  }
  res.json(result);
};

const add = async (req, res) => {
  console.log(req.body);
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `The contact with ${contactId} is not found.`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!req.body) {
    res.json({
      message: "missing field favorite",
    });
    throw HttpError(400);
  }
  if (!result) {
    throw HttpError(404, `The contact with id ${contactId} is not found.`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    res.status(404);
    throw HttpError(404, `The contact with id ${contactId} is not found.`);
  }
  res.json({
    message: "Delete is successful",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
