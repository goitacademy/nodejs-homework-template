const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const allContacts = await listContacts();

  res.json(allContacts);
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    throw HttpError(404, 'Not found');
  };

  res.json(contactById);
};

const postContact = async (req, res) => {
  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);

  if (!removedContact) {
    throw HttpError(404, 'Not found');
  };

  res.json({ message: "contact deleted" })
};

const putContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  };

  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  };

  res.json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContact: ctrlWrapper(getByIdContact),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
};