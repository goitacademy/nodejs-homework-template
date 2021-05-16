const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../model/contacts')
const Joi = require('joi')

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
})

router.get('/', async (_, res) => {
  listContacts().then(data => res.status(200).send(data))
})

router.get('/:contactId', async (req, res) => {
  const id = req.params.contactId
  getContactById(id).then(data =>
    data.length
      ? res.status(200).send(data)
      : res.status(404).json({ message: 'Not Found' }),
  )
})

router.post('/', async (req, res, next) => {
  const { value, error } = createUserSchema.validate(req.body)
  if (error) {
    res.status(400).json({ message: error.message })
    return
  }
  const { name, email, phone } = value
  addContact(name, email, phone).then(data => res.status(201).send(data))
})

router.delete('/:contactId', async (req, res) => {
  const id = req.params.contactId
  removeContact(id).then(data =>
    // data => console.log(data),
    data !== undefined
      ? res.status(200).json({ message: 'Contact deleted' })
      : res.status(404).json({ message: 'Not Found' }),
  )
})

router.patch('/:contactId', async (req, res) => {
  const { value, error } = createUserSchema.validate(req.body)
  const id = req.params.contactId
  if (error) {
    return res.status(400).json({ message: error.message })
  }

  updateContact(id, value).then(data =>
    data !== undefined
      ? res.status(200).send(data)
      : res.status(404).json({ message: 'Not Found' }),
  )
})

module.exports = router
