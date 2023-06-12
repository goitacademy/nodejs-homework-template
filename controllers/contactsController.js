const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  } = require('../models/contacts');
  const { validateContact } = require('../helpers/helper');
  
  const getAllContacts = async (req, res, next) => {
    try {
      const contacts = await listContacts();
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  };
  
  const getContact = async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const contact = await getContactById(contactId);
  
      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  };
  
  const createContact = async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
  
      if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newContact = await addContact(name, email, phone);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  };
  
  
  const deleteContact = async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const result = await removeContact(contactId);
  
      if (!result) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
      next(error);
    }
  };
  
  const updateContactById = async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const { name, email, phone } = req.body;
  
      if (!name && !email && !phone) {
        return res.status(400).json({ message: 'Missing fields' });
      }
  
      const updatedContact = await updateContact(contactId, { name, email, phone });
  
      if (!updatedContact) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  };
  
  
  module.exports = {
    getAllContacts,
    getContact,
    createContact,
    deleteContact,
    updateContactById,
  };
  