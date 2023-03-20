const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');
const { get } = require('express/lib/response');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, '', { skip, limit: Number(limit) });
  res.json(result);
}

const getById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" })
}

const updateFavourite = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  const result = await Contact.findByIdAndUpdate(id, { favorite: !contact.favorite }, { new: true });
  if (!result) {
    throw HttpError(400, "missing field favorite");
  }
  res.status(200).json(result);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavourite: ctrlWrapper(updateFavourite),
}