const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  try {
    const list = await listContacts();
    res.status(200);
    res.json({ contacts: JSON.parse(`${list}`) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const searchedContact = await getContactById(contactId);
    if (!searchedContact) {
      throw new Error(`Contact doesn't exist`);
    }
    res.status(200);
    res.json({ contact: searchedContact });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await addContact(body);
    res.status(201);
    res.json({ contact: newContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactList = await removeContact(contactId);
    if (contactList === 0) {
      throw new Error(`Contact doesn't exist`);
    }
    res.status(200);
    res.json({ message: "Contact is deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const updatedContact = await updateContact(contactId, body);
    res.status(200);
    res.json({ contact: updatedContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  changeContact,
};