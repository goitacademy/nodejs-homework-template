const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
  } = require("../models/contacts");
  
  const getContacts = async (req, res, next) => {

    console.log('GET /api/contacts called');

    try {
      const data = await listContacts();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  const getContactnbyId = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const data = await getContactById(contactId);
      if (!data) {
        return res.status(400).json({ message: "Not found" });
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  const postContact = async (req, res, next) => {
    try {
      const data = await addContact(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const data = await removeContact(contactId);
      if (data) {
        return res.status(200).json({ message: "contact deleted" });
      }
      res.status(400).json({ message: "Not found" });
    } catch (error) {
      next(error);
    }
  };
  
  const putContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
  
      const data = await updateContact(contactId, req.body);
      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(data);
    } catch (erorr) {
      next(erorr);
    }
  };
  
  module.exports = {
    getContacts,
    getContactnbyId,
    postContact,
    deleteContact,
    putContact,
  };