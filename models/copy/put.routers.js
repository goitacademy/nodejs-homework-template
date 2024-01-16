// const express = require('express')

// const fs = require("fs");
// const path = require("path");
// const router = express.Router()

// const contactsPath = path.resolve("./models/contacts.json");
// const data = fs.readFileSync(contactsPath);
// let contacts = JSON.parse(data);
// let newContact = {};


// const updateContact = (contactId, body) => {
//   newContact = contacts.find((el) => el.id === contactId)
  
//   const newContacts = contacts.filter((contact) => contact.id !== contactId)
  
//   if ( newContact) {    
//      newContact.name = body.name
//      newContact.email = body.email
//      newContact.phone = body.phone
//     newContacts.push( newContact)
//     contacts = newContacts  
//     fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
//     if (err) {
//       return console.log(`Reading error: ${err.message}`);      
//       }
    
//     });
   
//   } else {
//     // const contact = {
//     //   id: contactId,
//     //   name: body.name,
//     //   email: body.email,
//     //   phone: body.phone      
//     // }
//     // contacts.push(contact)
//     return false
    
//   }     
//   // fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
//   //   if (err) {
//   //     return console.log(`Reading error: ${err.message}`);      
//   //     }
    
//   //   });
// }

// router.put('/:contactId', async (req, res, next) => {
//   const contactId = req.params.contactId
//   const contact = contacts.find((el) => el.id === contactId)
//   const body = {
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone
//   };
 
  
//   if ( body.name === undefined) {
//     return res.status(400).send({ message: "missing field name" })
//   }
//   if (body.email === undefined) {
//     return res.status(400).send({ message: "missing field email" })
//   }
//   if ( body.phone  === undefined) {
//     return res.status(400).send({ message: "missing field phone" })
//   }
//   if (contact) {
//     updateContact(contactId, body)
//     return res.status(200).json(newContact)
//   }
//   else {
//     return res.status(404).json("Not found")
   
//   }
  
  

// })

// module.exports = router