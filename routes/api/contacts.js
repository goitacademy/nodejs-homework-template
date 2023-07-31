const express = require('express')
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
    res.status(200);

  } catch (error) {
    res.status(404);
    next(error)
  }; 
})


router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId
    const singleContact = await getContactById(contactId);
    if (!singleContact) {
      res.status(404).json({ message: 'Not found' })
    }
    res.json(singleContact);
    res.status(200);
  } catch (error) {
    next(error);
  };
    
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const newContact = await addContact(body);
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
    res.status(404).json({ message: 'Could not validate input' })
  }
  

})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
