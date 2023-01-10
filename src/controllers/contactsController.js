const api = require('../../models/contacts');

const getContacts = async (req, res) => {
  try {
    const contactsList = await api.listContacts();
    res.json({ contactsList, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneContactById = async (req, res) => {
  try {
    const searchedContact = await api.getContactById(req.params.contactId);

    if (!searchedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ searchedContact, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNewContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const newContact = await api.addContact({ name, email, phone });
    res.status(201).json({ newContact, status: 201 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const result = await api.removeContact(req.params.contactId);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'contact deleted', status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeOldContact = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const updatedContact = await api.updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ updatedContact, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeOldContact,
};
