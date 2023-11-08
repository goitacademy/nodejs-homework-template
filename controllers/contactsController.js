const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../models/contacts.js');
const { createContactValidationSchema, updateContactValidationSchema } = require('../utils/validation/contactValidationSchemes');


const getAllContacts = async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json(contacts)
};

const getOneContact = async (req, res, next) => {
  const { contactId } = req.params;  
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
const { error } = createContactValidationSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({ message: errorMessages });
    return;
  } 

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const upContact = async (req, res, next) => {
if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  }
    const { error } = updateContactValidationSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: "Not found" });
    return;
  } 
  const { contactId } = req.params;
  const updateCont = await updateContact(contactId, req.body);
  res.status(200).json(updateCont);
};

const deleteContact = async (req, res, next) => {
const { contactId } = req.params;  
  const contact = await removeContact(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({"message": "contact deleted"});
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  upContact,
  deleteContact,
};
