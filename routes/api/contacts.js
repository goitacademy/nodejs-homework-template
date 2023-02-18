const express = require('express')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
     res.json(await listContacts())
  } catch (error) {
     next(error);
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
  const getContId = await getContactById(contactId);
    if (!getContId) {
      res.status(404).send(`contact with ID: ${contactId} NOT FOUND!!! `)
   
    next()
  }
  res.json(getContId)
  } catch (error) {
    next(error);
  }
  
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
