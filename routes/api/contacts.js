const express = require('express')
const router = express.Router()
const path = require('path')
const validatorPath = path.resolve('model/validation.js')
const { validateBeforeCreate, validateBeforeUpdate } = require(validatorPath)
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model')

<<<<<<< HEAD
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model')

router.get('/', async (_req, res) => {
  try {
    const contacts = await listContacts()
    res.status(200).json(contacts)
  } catch (error) {
    res.status(401).json({ message: error.message })
=======
router.get('/', async (_req, res) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ ...contacts })
  } catch (error) {
    res.status(401).json('something wrong')
>>>>>>> master
  }
})

router.get('/:contactId', async (req, res) => {
  try {
<<<<<<< HEAD
    const result = await getContactById(req.params.contactId)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
=======
    const contact = await getContactById(req.params.contactId)
    res.status(200).json({ ...contact })
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
>>>>>>> master
  }
})

router.post('/', async (req, res) => {
  try {
<<<<<<< HEAD
    const result = await addContact(req.query)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
=======
    await validateBeforeCreate(req.query)
    const contact = await addContact(req.query)
    res.status(201).json({ ...contact })
  } catch (error) {
    res.status(400).json({ message: 'missing required name field' })
>>>>>>> master
  }
})

router.delete('/:contactId', async (req, res) => {
<<<<<<< HEAD
    try {
      await removeContact(req.params.contactId)
      res.status(201).json({ message: 'Deleted!' })
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
=======
  try {
    await removeContact(req.params.contactId)
    res.status(201).json({ message: 'contact deleted' })
  } catch (error) {
    res.status(404).json({ message: 'contact not found' })
  }
>>>>>>> master
})

router.patch('/:contactId', async (req, res) => {
  try {
<<<<<<< HEAD
    const result = await updateContact(req.params.contactId, req.query)
    res.status(201).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
=======
    await getContactById(req.params.contactId)
    await validateBeforeUpdate(req.query)
    await updateContact(req.params.contactId, req.query)
    res.status('201').json({ message: 'Updated!' })
  } catch (error) {
    res.status('404').json({ message: error.message })
>>>>>>> master
  }
})

module.exports = router
