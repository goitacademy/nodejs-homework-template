const { httpErrorFunc, ctrlWrapper } = require('../helpers');

const { Contact } = require('../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.params;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, '-createdAr -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');
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
  console.log(req.user);
  const { _id: owner } = req.user;
  const result = (await Contact.create({ ...req.body, owner })).populate(
    'owner',
    'name email'
  );
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
