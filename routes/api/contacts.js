const express = require('express');
const { listContacts, getContactById } = require('../../models/contacts');


const router = express.Router()

router.get('/', async (req, res, next) => {
  try{
    const contacts = await listContacts();

    res.status(200).json({ message: 'Success', contacts })
  } catch(error) {
    res.status(500).json({message: error.message})
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json({
        message: 'Success',
        contact
      })
    } else {
      res.status(404).json({message: 'Not found'})
    }
    
  } catch(error) {
    res.status(500).json({ message: error.message })
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
