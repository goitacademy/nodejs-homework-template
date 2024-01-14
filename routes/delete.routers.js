const express = require('express')

const fs = require("fs");
const path = require("path");
const router = express.Router()

const contactsPath = path.resolve("./models/contacts.json");
const data = fs.readFileSync(contactsPath);
let contacts = JSON.parse(data);

// const addContact = (contact) => {
  
//   contacts.push(contact);
//   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
//     if (err) {
//       return console.log(`Reading error: ${err.message}`);      
//     }
//   });
//   return contact;
// }
const removeContact = (contactId) => {
// console.log(contactId)
  const validate = contacts.find((contact) => contact.id === contactId);
  if (validate) {
    const newContacts = contacts.filter((contact) => contact.id !== contactId)
    console.log('znalazlo')
    
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), (err) => {
    if (err) {
      return console.log(`Reading error: ${err.message}`);      
      }
    else {
      console.log(newContacts)
      console.log('usuneło')
      }
    });
    contacts = newContacts
    
  } else {
    console.log('nie znalazlo')

    return false
  }
}

router.delete('/:contactId', (req, res, next) => {
  
  const contact = removeContact(req.params.contactId);
  
  if (!contact) {
    return res.status(404).send({ message: "Not found" })
  }
  res.status(200).send({ message: "contact deleted"})
})
  
  // if (!contact.name || !contact.email || !contact.phone || !contact.id ) {
  //   return res.status(400).send({ message: "missing required name - field"})
  // } else {
  // addContact(contact);  
  // res.status(201).send(contact)
  // }
  


module.exports = router