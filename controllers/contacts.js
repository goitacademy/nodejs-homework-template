const { HttpError, ctrlWrapper } = require('../helpers');
const { Contact } = require('../models/contact');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;
  const query = {
    owner,
    ...(favorite !== undefined && { favorite }),
  };

  const contactList = await Contact.find(query, '', { skip, limit });
  res.json(contactList);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const updatedContact = await Contact.findByIdAndUpdate(id, body, { new: true });

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndRemove(id);

  if (!removedContact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
