/* eslint-disable spaced-comment */

const { nanoid } = require("nanoid");
const Joi = require("@hapi/joi")

const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");
const data = fs.readFileSync(contactsPath);
let contacts = JSON.parse(data);
let newContact = {};

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.number()
    .required()

});

const validate = (contactId) => contacts.find((contact) => contact.id === contactId);
const filteredContacts = (contactId) => contacts.filter((contact) => contact.id !== contactId)
const saveFile = () => {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
    if (err) {
      return console.log(`Reading error: ${err.message}`);      
    }
  });
}

const listContacts =  () => {
    try {      
       return contacts;
} catch (err) {
  return console.log(err.message);
  }
}

const getById = (contactId) => {
  return contacts.find((contact) => contact.id === contactId);
}

const addContact = (contact) => {
    const newContact = {
        id: nanoid(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone
  }
  contacts.push(newContact);
    saveFile();
  return newContact;
}

const removeContact = (contactId) => {
  
    contacts = filteredContacts(contactId)
   saveFile(contacts)
     
}

 const updateContact = (contactId, body) => {
  newContact = validate(contactId)
  
  const newContacts = filteredContacts(contactId)
  
  if ( newContact) {    
     newContact.name = body.name
     newContact.email = body.email
     newContact.phone = body.phone
    newContacts.push( newContact )
    contacts = newContacts  
    saveFile(contacts)
    
  } else {   
    return false    
  }     
}
 
module.exports = { addContact, schema, listContacts, getById, removeContact, validate, updateContact }

