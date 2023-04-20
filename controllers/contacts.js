const { httpErrorFunc, ctrlWrapper } = require('../helpers');

const { Contact } = require('../models/contact');

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw httpErrorFunc(404, 'Not found');
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    throw httpErrorFunc(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw httpErrorFunc(404, 'Not found');
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw httpErrorFunc(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  update: ctrlWrapper(update),
};
