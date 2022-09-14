const express = require('express')
const { v4: uuid } = require('uuid');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts')
const {addContactSchema, updateContactSchema} = require('../../utils/validationSchemas')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json(contacts)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contact = await getContactById(contactId)

    if (!contact) return res.status(404).json({ message: 'Not found' })
    
    res.json(contact)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.post('/', async (req, res, next) => {
  const {error, value: contactData} = addContactSchema.validate(req.body)

  if (error) return res.status(400).json({message: error.details[0].message})

  const id = uuid()

  try {
    const newContact = await addContact({ id, ...contactData })
    res.status(201).json(newContact)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contact = await removeContact(contactId)

    if (!contact) return res.status(404).json({ message: 'Not found' })
    
    res.json({message: "Contact deleted"})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const {contactId} = req.params
  const {error, value: contactData} = updateContactSchema.validate(req.body)

  if(error) return res.status(400).json({message: error.details[0].message})
  
  try {
    const updatedContact = await updateContact(contactId, contactData)

    if (!updatedContact) return res.status(404).json({ message: 'Not found' })
    
    res.json(updatedContact)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router
