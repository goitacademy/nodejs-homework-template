const express = require('express')

const fs = require("fs");
const path = require("path");
const router = express.Router()

const contactsPath = path.resolve("./models/contacts.json");
const data = fs.readFileSync(contactsPath);
let contacts = JSON.parse(data);


const removeContact = (contactId) => {

  const validate = contacts.find((contact) => contact.id === contactId);
  if (validate) {
    const newContacts = contacts.filter((contact) => contact.id !== contactId)
    
    contacts = newContacts
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), (err) => {
    if (err) {
      return console.log(`Reading error: ${err.message}`);      
      }
    
    });
    
    
  } else {
    
    return false
  }
  
}

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const validate = contacts.find((contact) => contact.id === contactId);
   
  if (!validate) {
    
    return res.status(404).send({ message: "Not found" })
  } else {
    
  removeContact(contactId);
  res.status(200).send({ message: "contact deleted"})
}})
  
 


module.exports = router