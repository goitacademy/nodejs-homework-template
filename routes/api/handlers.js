/* eslint-disable spaced-comment */
const express = require('express')
const { nanoid } = require("nanoid");


const fs = require("fs");
const path = require("path");
const router = express.Router()


const contactsPath = path.resolve("./models/contacts.json");
const data = fs.readFileSync(contactsPath);
let contacts = JSON.parse(data);
let newContact = {};

router.validate = (contactId) => contacts.find((contact) => contact.id === contactId);
const filteredContacts = (contactId) => contacts.filter((contact) => contact.id !== contactId)
const saveFile = () => {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
    if (err) {
      return console.log(`Reading error: ${err.message}`);      
    }
  });
}

router.listContacts =  () => {
    try {      
        // console.log(nanoid())
    return contacts;
} catch (err) {
  console.log(err.message);
  }
}

router.getById = (contactId) => {
  return contacts.find((contact) => contact.id === contactId);
}

router.addContact = (contact) => {
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

router.removeContact = (contactId) => {
  
    contacts = filteredContacts(contactId)
   saveFile(contacts)
     
}

    router.updateContact = (contactId, body) => {
  newContact = router.validate(contactId)
  
  const newContacts = filteredContacts(contactId)
  
  if ( newContact) {    
     newContact.name = body.name
     newContact.email = body.email
     newContact.phone = body.phone
    newContacts.push( newContact )
    contacts = newContacts  
    saveFile(contacts)
  } else {
    // const contact = {
    //   id: contactId,
    //   name: body.name,
    //   email: body.email,
    //   phone: body.phone      
    // }
    // contacts.push(contact)
    return false
    
  }     
  // fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
  //   if (err) {
  //     return console.log(`Reading error: ${err.message}`);      
  //     }
    
  //   });
}




 

module.exports = router

