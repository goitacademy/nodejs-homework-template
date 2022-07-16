const express = require('express')
const router = express.Router()
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../models/contacts')
const {validateContact, validateId} = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ status: 'success', code: 200, data: {contacts}})
  } catch(error) {
    next(error)
  }
})

router.get('/:contactId', validateId, async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if(contact) {
      return res.status(200).json({ status: 'success', code: 200, data: {contact}})
    }
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found'})
    
  } catch(error) {
    next(error)
  }
})

router.post('/', validateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: {contact}})
  } catch(error) {
    next(error)
  }
})

router.delete('/:contactId', validateId, async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if(contact) {
      return res.status(200).json({ status: 'success', code: 200, message: 'Contact deleted', data: {contact}})
    }
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found'})
    
  } catch(error) {
    next(error)
  }
})

router.put('/:contactId', validateId, validateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if(contact) {
      return res.status(201).json({ status: 'success', code: 201, data: {contact}})
    }
    return res.status(404).json({ status: 'error', code: 404, message: 'Missing fields'})
    
  } catch(error) {
    next(error)
  }
})

module.exports = router