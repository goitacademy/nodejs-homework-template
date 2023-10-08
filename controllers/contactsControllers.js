const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  } = require("../models/contacts");
  
  const getContacts = async (req, res, next) => {
      try {
          const contacts = await listContacts();
          res.status(200).json(contacts)
      }
      catch (error) {
          next (error)
      }
  }
  
  const getContact = async (req, res, next) => {
      try {
          const { contactId } = req.params;
          const contact = await getContactById(contactId);
          res.status(200).json(contact);
      }
      catch (error) {
          next(error)
      }
  }
  
  const deleteContact = async (req, res, next) => {
      try {
        const { contactId } = req.params;
        const contact = await removeContact(contactId);
        res.status(200).json({ message: "contact deleted", deletedContact: contact });
      } catch (error) {
        next(error);
      }
  }
  
  const createContact = async (req, res, next) => {
      try {
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
      } catch (error) {
        next(error);
      }
  }   
  
  const refreshContact = async (req, res, next) => {
      try {
        const { contactId } = req.params;
        const contact = await updateContact(contactId, req.body);
        res.status(200).json(contact);
      } catch (error) {
        next(error);
      }
  }
  
  module.exports = {getContacts, getContact, deleteContact, createContact, refreshContact}