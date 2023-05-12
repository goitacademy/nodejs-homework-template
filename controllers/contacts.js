const { Contact } = require("../models/contact");

const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;

  const deleteContact = await Contact.findByIdAndRemove(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const update = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;

  const update = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};

const updateStatusContact = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;

  const update = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  remove: ctrlWrapper(remove),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
