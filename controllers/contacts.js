
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../models/contacts');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { HttpError } = require('../helpers/HttpError');

const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({ contacts });
};

const getById = async (req, res) => {
  const contactId = req.params.id;
  const contact = await getContactById(contactId);
  
  if (contact) {
    res.status(200).json(contact);
  } else {
    throw HttpError(404, 'Not found');
  }
};

const addOneContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await addContact({ name, email, phone });

  return res.status(201).json({ id: newContact.id, name, email, phone });
};
  
const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
  
    const updatedContact = { id: contactId, name, email, phone };
    const result = await updateContact(contactId, updatedContact);
  
    res.json(result);
  };

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addOneContact: ctrlWrapper(addOneContact),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContactById: ctrlWrapper(deleteContactById)
};



