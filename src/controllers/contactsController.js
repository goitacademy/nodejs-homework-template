// const api = require('../../models/contacts');

const Contact = require('../models/contactsMongo');

const getContacts = async (req, res) => {
  try {
    const contactsList = await Contact.find({}, '-__v');
    // const contactsList = await api.listContacts();
    res.json({ contactsList, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneContactById = async (req, res) => {
  try {
    const searchedContact = await Contact.findById(req.params.contactId, '-__v');

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

    const newContact = await Contact.create(req.body);
    res.status(201).json({ newContact, status: 201 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndRemove(req.params.contactId);
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

    const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ updatedContact, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFavorite = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
      new: true,
    });
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
  updateFavorite,
};
