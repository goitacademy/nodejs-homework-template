const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../helpers');

const { Contact } = require('../models/contact');

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) throw HttpError(404, 'Not found');

  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404, 'Not found');

  res.status(200).json({ message: 'contact deleted' });
};

const updateById = async (req, res, next) => {
  const contactBody = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, contactBody, {
    new: true,
  });

  if (!result) throw HttpError(404, 'Not found');

  res.status(201).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const contactBody = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, contactBody, {
    new: true,
  });

  if (!result) throw HttpError(404, 'Not found');
  if (!contactBody.favorite) throw HttpError(400, 'missing field favorite');

  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
