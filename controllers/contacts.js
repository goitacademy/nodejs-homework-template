const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({_id: id});
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, body.favorite, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
  // res.json(result);
  // res.status(204).send()
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
