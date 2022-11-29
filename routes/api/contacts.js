const express = require('express');
const {NotFound}=require("http-errors")

const router = express.Router();
const contactsOperations = require("../../models/contacts");

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
      if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
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
