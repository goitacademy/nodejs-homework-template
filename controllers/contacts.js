const contacts = require('../models/contacts');

const { HttpError } =require("../helpers/HttpError")
const { ctrlWrapper } = require("../helpers/ctrlWrapper");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts(); 
  res.json(result); 
}

const getContactById = async (req, res) => {
  const {contactId} = req.params; 
  const result = await contacts.getContactById(contactId); 
    if(!result) { 
      throw HttpError(404, `Contact '${contactId}' Not found`)
    }
    res.json(result);
}

const addContact = async (req, res) => { 
    const result = await contacts.addContact(req.body); 
    res.status(201).json(result); 
}

const deleteContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await contacts.removeContact(contactId); 
    if(!result) { 
      throw HttpError(404, `Contact '${contactId}' Not found`)
    }
    res.status(200).json({
      message: `Contact ${contactId} deleted`,
    });
}

const updateContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await contacts.updateContactById(contactId, req.body); 
    if(!result) { 
      throw HttpError(404, `Contact '${contactId}' Not found`)
    }
    res.json(result);
}

module.exports = { 
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact), 
  updateContact: ctrlWrapper(updateContact),
}