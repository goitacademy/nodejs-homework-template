const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model/index')
const yup = require('yup')

const router = express.Router()
const schemaValidate = require('../../middleware/schemaValidate')

const createSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).required(),
})

const updateSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string().min(10),
})

router.get('/', async (req, res) => {
  try {
    const contacts = await listContacts()
    res.json(contacts)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const targetContact = await getContactById(req.params.contactId)

    if (!targetContact) {
      res.status(404).json({
        message: 'Contact not found',
      })
      return
    }

    res.json(targetContact)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post('/', schemaValidate(createSchema), async (req, res) => {
  try {
    const newContact = await addContact(req.body)

    res.json(newContact)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    const targetContact = await removeContact(req.params.contactId)

    if (!targetContact) {
      res.status(404).json({
        message: 'Contact not found',
      })
      return
    }

    res.status(200).send('Contact was deleted')
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.put('/:contactId', schemaValidate(updateSchema), async (req, res) => {
  try {
    const targetContact = await updateContact(req.params.contactId, req.body)
    if (!targetContact) {
      res.status(404).json({
        message: 'Contact not found',
      })
      return
    }

    res.json(targetContact)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router
