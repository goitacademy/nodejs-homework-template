const express = require('express')

const router = express.Router()

const {listContacts, getContactById, addContact } = require("../../models/contacts")



router.get('/', async (req, res, next) => {
  const allContacts = await listContacts();
  res.json(allContacts);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const oneContact = await getContactById(contactId);
  console.log(req.params);
  res.json(oneContact);
})

router.post('/', async (req, res, next) => {
   const addedContact = await addContact ();
  res.json(addedContact)
})

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
