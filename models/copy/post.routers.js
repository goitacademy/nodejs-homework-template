const express = require('express')

const fs = require("fs");
const path = require("path");
const router = express.Router()

const contactsPath = path.resolve("./models/contacts.json");
const data = fs.readFileSync(contactsPath);
const contacts = JSON.parse(data);

const addContact = (contact) => {
  
  contacts.push(contact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
    if (err) {
      return console.log(`Reading error: ${err.message}`);      
    }
  });
  return contact;
}


router.post('/', (req, res, next) => {
  const contact = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  if (!contact.name || !contact.email || !contact.phone || !contact.id ) {
    return res.status(400).send({ message: "missing required name - field"})
  } else {
  addContact(contact);  
  res.status(201).send(contact)
  }
  
})

module.exports = router