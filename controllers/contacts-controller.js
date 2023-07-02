const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    '-createdAt -updatedAt',
    {
      skip,
      limit: Number(limit),
    }
  ).populate('owner', 'email subscription');

  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { body } = req;
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: 'Contact deleted',
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};