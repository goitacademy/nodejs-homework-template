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
  const list = await listContacts();
  res.status(200).json(list);
};

const getContactWithId = async (req, res) => {
  const { contactId } = req.params;
  const contactWithId = await getContactById(contactId);
  if (!contactWithId) {
    throw new NotFoundContact(`Not Found contact with id ${contactId}`);
  } else res.status(200).json(contactWithId);
};

const postContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

const patchContact = async (req, res) => {
  const { contactId } = req.params;

  const contactUpdated = await updateContact(contactId, req.body);

  if (!contactUpdated) {
    res.status(404).json({ message: 'Not found' });
  } else return res.status(200).json(contactUpdated);
};

const patchContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  const updatedContact = await updateStatusContact(contactId, req.body);

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
