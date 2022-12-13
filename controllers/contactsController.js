
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../models/contacts');

const getContactsController = async (req, res) => { 
  const contacts = await listContacts();
  return res.status(200).json({ data: contacts});
}

const getContactByIdController = async (req, res) => {
    const foundContact = await getContactById(String(req.params.contactId));
    if (foundContact) {
        return res.status(200).json({ data: foundContact });
    }
    return res.status(404).json({ message: "Not found" });
}

const addContactController = async (req, res ) => {
    const newContact = await addContact(req.body);
    return res.status(201).json({ data: newContact });
}

const removeContactController = async (req, res) => {
    const deletedContact = await removeContact(String(req.params.contactId));
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" }); 
    }
    return res.status(404).json({ message: "Not found" });
}

const updateContactController = async (req, res) => {
    const updatedContact = await updateContact(String(req.params.contactId), req.body);
    if (updatedContact) {
      return res.status(200).json({ data: updatedContact }); 
    }
    return res.status(404).json({ message: "Not found" });
}

module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController
}