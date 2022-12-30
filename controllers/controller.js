import actions from '../models/contacts.js';
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = actions;

const getAllContacts = async (_, res) => {
  const contactList = await listContacts();

  if (!contactList) {
    return res.status(404).json({
      message: `Not found`,
    });
  }

  res.status(200).json(contactList);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const newContact = await addContact(req.body);

  if (!newContact) {
    return res.status(400).json({ message: 'Bad request' });
  }

  res.status(201).json(newContact);
};

const changeContact = async (req, res) => {
  const {
    params: { contactId },
    body,
  } = req;

  const updatedContact = await updateContact({
    id: contactId,
    ...body,
  });

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(updatedContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedId = await removeContact(contactId);

  if (!deletedId) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json({ message: 'Contact deleted' });
};

export default {
  getAllContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
};
