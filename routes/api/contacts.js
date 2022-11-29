const express = require('express');
const contactsOperations = require("../../models/contacts");

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json({ contacts });
  } catch(error) {
    next(error);
  }
  });


router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    res.status(200).json({ result });
  } catch(error) {
    
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

module.exports = router;
