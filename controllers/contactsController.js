const { v4: uuidv4 } = require("uuid");
const contactsApi = require('../models/contacts.js');


// const contacts = await Contacts.find({}).toArray();
  // console.log(contacts);

const getContacts = async (req, res) => {
    const { Contacts } = require("../db/collections");
  const contacts = await Contacts.find({}).toArray();
  res.status(200).json(contacts);
}

const getContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsApi.getContactById(id);
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json(contact);
}

const addContact = async (req, res, next) => {     
  const { name, phone, email } = req.body;
  const dataWithId = { id: uuidv4(), name, email, phone  }
  const contact = await contactsApi.addContact(dataWithId);
  res.status(201).json(contact);
}

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;  
  const idDeleted = await contactsApi.removeContact(id);
  if (!idDeleted) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(204).json( {message: `User with id${idDeleted} was deleted` });
}

const putContacts = async (req, res, next) => {  
  const id = req.params.contactId;
  const data = req.body;
  
  const contact = await contactsApi.updateContact(id, data);
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json( contact )
}

module.exports = {
    getContacts,
    getContactsById,
    addContact,
    deleteContact,
    putContacts
}