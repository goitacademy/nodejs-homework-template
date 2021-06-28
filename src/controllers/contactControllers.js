const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../model/contactService');

const { NotFoundContact } = require('../helpers/errors');

const getContact = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const data = await listContacts(_id, { page, limit });
  const { docs, totalPages, totalDocs } = data;

  res.status(200).json({ docs, page, totalPages, totalDocs });
};

const getContactWithId = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contactWithId = await getContactById(contactId, _id);
  if (!contactWithId) {
    throw new NotFoundContact(`Not Found contact with id ${contactId}`);
  } else res.status(200).json(contactWithId);
};

const postContact = async (req, res) => {
  const { _id } = req.user;
  const newContact = await addContact(req.body, _id);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  await removeContact(contactId, _id);
  res.status(200).json({ message: 'contact deleted' });
};

const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contactUpdated = await updateContact(contactId, req.body, _id);

  if (!contactUpdated) {
    res.status(404).json({ message: 'Not found' });
  } else return res.status(200).json(contactUpdated);
};

const patchContactStatus = async (req, res) => {
  const { _id } = req.user;

  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  const updatedContact = await updateStatusContact(contactId, req.body, _id);

  if (!updatedContact) {
    res.status(404).json({ message: 'Not found' });
  } else return res.status(200).json(updatedContact);
};

module.exports = {
  getContact,
  getContactWithId,
  postContact,
  deleteContact,
  patchContact,
  patchContactStatus,
};
