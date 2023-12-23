const { HttpError, ctrlWrapper } = require('../helpers');
const { Contact } = require('../models/contacts');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contactsFilter = { owner };
  if (favorite !== undefined) {
    contactsFilter.favorite = favorite;
  }
  const result = await Contact.find(contactsFilter, '-createdAt, -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');

  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findById(id, '-createdAt, -updatedAt');
  if (!result || !result.owner.equals(owner)) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result || !result.owner.equals(owner)) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result || !result.owner.equals(owner)) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id });
  if (!result || !result.owner.equals(owner)) {
    throw HttpError(404);
  }
  res.status(200).json({ message: 'contact deleted' });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
