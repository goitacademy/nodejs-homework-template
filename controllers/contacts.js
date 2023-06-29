const Contact = require('../models/MongooseModels/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const data = await Contact.find({}, '-createdAt -updatedAt');
  res.json(data);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
