const express = require('express')
// const contacts = require('../../models/contacts')
const { listContacts, getContactById, addContact, removeContact } = require('../../models/contacts')

const contactsRouter = express.Router()

contactsRouter.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  console.log("contacts:", contacts)
  res.status(200).json(contacts)
})

contactsRouter.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId)
  if (contact) {
    console.log("contact:", contact)
    return res.status(200).json(contact)
  }
  return res.status(404).json({message: "Not found"})
})

contactsRouter.post('/', async (req, res, next) => {
  const { name, email, phone} = req.body;
  const newContact = await addContact(body);
  console.log("newContact:", newContact)
  res.status(201).json(newContact);
  
})

// contactsRouter.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   if (contactId) {
//     await removeContact(contactId)
//     res.status(200).json({message: `contact ${contactId} deleted`})
//     }
//     return res.status(404).json({message: "Not found"})
    
    
    
  
// })

// contactsRouter.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = contactsRouter
