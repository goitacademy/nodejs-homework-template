const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const contact = await getContactById(contactId);
  console.log(contact)
  contact.length ? res.status(200).json(contact) : res.status(404).json("Not found!") 
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const id =  await addContact(name, email, phone);
  res.status(201).json(await getContactById(id))
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const isSuccess = await removeContact(contactId);
  isSuccess ? res.status(200).json("Contact deleted") : res.status(404).json("Not found!")
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    res.status(400).json("Missing fields");
    return;
  }
 const updatedContact = await updateContact(contactId, req.body)
 updatedContact ? res.status(200).json(await getContactById(contactId)) : res.status(404).json("Not found!")
})

module.exports = router
