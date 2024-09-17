const express = require('express')
const router = express.Router()
const contacts = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    console.log('All Contacts:', allContacts);
    res.status(200).json(allContacts)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if(!result) {
      return res.status(404).json({message: 'Not found'})
    }
    res.json(result)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = contacts.contactSchema.validate(req.body, { abortEarly: false })
    if(result.error) {
      return res.status(400).json({ message: result.error.message})
    }
    const addContact = await contacts.addContact(req.body)
    res.status(201).json(addContact)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if(!result) {
      console.error(404, "not found")
    }
    res.json(result)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = contacts.contactSchema.validate(req.body)
    if(result.error) {
      return res.status(400).json({ message: result.error.message})
    }
    const updContact = await contacts.updateContact(contactId, req.body)
    res.status(201).json(updContact)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router
