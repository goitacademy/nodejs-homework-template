const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact, schemas } = require("../models/contact");

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = schemas.addSchemaforPost.validate(req.body);
  const { favorite } = req.body;
  if (error) {
    throw HttpError(400, "missing required name field");
  }

  if (favorite === undefined) {
    req.body = {
      ...req.body,
      favorite: false,
    };
    console.log("favorite false");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = schemas.addSchemaforPut.validate(req.body);
  const length = Object.keys(req.body).length;

  if (length === 0) {
    throw HttpError(400, "No body");
  }

  if (error) {
    throw HttpError(400, "missing fields");
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const length = Object.keys(req.body).length;

  if (length === 0) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
