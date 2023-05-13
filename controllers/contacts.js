const { HttpError, ctrlWrapper } = require('../helpers');
const { Contact } = require('../models/contact');

const listContacts = async (req, res) => {
  const contactList = await Contact.find({});
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

const addContact = async ({ body }, res) => {
  const newContact = await Contact.create(body);
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
