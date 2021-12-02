const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const Joi = require('joi')

const schema = Joi.object(
  {
    name: Joi.string().min(3).max(30).required().regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().min(8).max(99).required(),
    favorite: Joi.boolean(),
  })

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
} = require('../../model/index')

router.use(authMiddleware)
router.get('/', async (req, res, next) => {
  try {
    const { _id } = req.user
    const contacts = await listContacts(_id)
    res.status(200)
    res.json(contacts)
  } catch (error) {
    res.json(error.message)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const { _id } = req.user
  const contact = await getContactById(contactId, _id)
  if (contact === void 0 || contact === null) {
    res.status(404)
    res.json({ message: 'Not found' })
  }
  res.status(200)
  res.json(contact)
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = await schema.validateAsync(req.body)
    const { _id } = req.user
    const newContact = { name, email, phone }
    await addContact(newContact, _id)
    res.status(201)
    res.json(newContact)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json({ message: error.message })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const { _id } = req.user
  const contact = await removeContact(contactId, _id)
  if (contact === void 0) {
    res.status(404)
    res.json({ message: 'Not found' })
  }
  res.status(200)
  res.json({ message: 'contact deleted' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { _id } = req.user
    const body = await schema.validateAsync(req.body)
    const updatedContact = await updateContact(req.params.contactId, body, _id)
    if (!updatedContact) { res.json({ message: 'Not found' }) }
    res.status(200)
    res.json(updatedContact)
  } catch (error) {
    res.status(400)
    res.json({ message: error.message })
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)
    const updatedContact = await updateFavoriteContact(req.params.contactId, req.body)
    if (!updatedContact) { res.json({ message: 'Not found' }) }
    res.status(200)
    res.json(updatedContact)
  } catch (error) {
    res.status(400)
    res.json({ message: error.message })
  }
})

module.exports = router
