const fs = require('fs/promises')
const {listContacts} = require("../utils/listContacts");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join('models', 'contacts.json');
const { createUserDataValidator, updateUserDataValidator } = require('../utils/contactValidator');


const getListContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({
    contacts,
  });
} catch (err) {
    next(err);
}
}

const getContactById = async (req, res, next) => {
  try {

    const contacts = await listContacts();

    const contactToId = contacts.find((contact) => contact.id === String(req.params.contactId));

    
    if (!contactToId) {
      return res.status(404).json({
        "message": "Not found"
      });
    }
  res.status(200).json({
    contactToId,
  });
} catch (err) {
  next(err);
}
}

const removeContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();


  const afterRemoveContact = contacts.filter(contact => contact.id !== String(req.params.contactId));
  
  await fs.writeFile(contactsPath, JSON.stringify(afterRemoveContact));

  res.status(200).json({"message": "contact deleted"});
  } catch (err) {
     next(err);
  }
}

const addContact = async (req, res, next) => {
  try {
    const { error, value } = createUserDataValidator(req.body); 

if (error) {
  return res.status(400).json({ message: error.details[0].message})
}

    const { name, email, phone} = value;
    const contacts = await listContacts();

   const newContacts = [...contacts, { id: v4(), name, email, phone }];


   await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");

 res.status(200).json({"message": "contact create"});
  } catch (err) {
    
   next(err);
  }
  
}

const updateContact = async (req, res, next) => {
  try {

const { error, value } = updateUserDataValidator(req.body); 

if (error) {
  return res.status(400).json({ message: error.details[0].message})
}

console.log(value)

const contacts = await listContacts();

    const indexcontact = contacts.findIndex((item) => item.id === req.params.contactId);

    
if (indexcontact === -1) {
  return res.status(404).json({ message: "Not found"})
}
 
    contacts[indexcontact] = { ...contacts[indexcontact], ...value };
  

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  
 res.status(200).json({"message": "contact update"});
  } catch (err) {
   next(err);
}
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
