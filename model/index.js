const fs = require('fs/promises')
const path = require("path")
const contacts = require('./contacts.json');
const { v4 } = require("uuid");
const Contact=require('../model/contact')

const getData = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  return JSON.parse(data);
};

 const listContacts = async () => {
  return await Contact.find({});
}


const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId)
  return result
};
 

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId)

}


const addContact =  (body) => {
   return Contact.create(body)

}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body,{new:true})
  return result
}

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, {new:true});
  return result
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
