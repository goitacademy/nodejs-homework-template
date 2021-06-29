const Joi = require('joi')

const express = require('express')
const router = express.Router()
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../controllers/contactsController')

// Всі контакти
router.get('/', async (req, res, next) => {
  try {
    const contactss = await listContacts()
    await res.status(200).json(contactss)
  } catch (er) {
    console.error(er)
  }
})
// вибір контакту по ІД
router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  if (contact === undefined) {
    await res.status(404).json({ message: 'Not Found' })
    return
  }
  await res.status(200).json({ contact })
})
// Додати контакт
router.post('/', async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().max(30),
    phone: Joi.string().min(10).max(14).required(),
    favorite: Joi.boolean().optional(),
  })

  const validationResult = schema.validate(req.body)
  try {
    if (validationResult.error) {
      await res.status(400).json({ message: 'not valid entry/entries' })
      return
    }
    if (!name || !email || !phone) {
      await res.status(400).json({ message: 'missing required field' })
      return
    }
    const addedContact = await addContact(name, email, phone, favorite)

    await res.status(201).json(addedContact)
  } catch (err) {
    await res.status(404).json({ message: err })
  }
})
// Видалення контакту
router.delete('/:contactId', async (req, res, next) => {
  try {
    const deleteOperation = await removeContact(req.params.contactId)

    if (!deleteOperation) {
      await res.status(404).json({ message: 'Not Found' })
      return
    }
    await res.status(200).json({ message: 'contact deleted' })
  } catch (err) {
    await res.status(404).json({ message: err })
  }
})
// Змінити контакт
router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().max(30),
    phone: Joi.string().min(10).max(14).required(),
    favorite: Joi.boolean().required(),
  })
  const validationResult = schema.validate(req.body)
  try {
    if (validationResult.error) {
      await res.status(400).json({ message: 'not valid entry/entries' })
      return
    }
    const contact = await updateContact(
      name,
      email,
      phone,
      favorite,
      req.params.contactId,
    )
    if (contact === undefined) {
      await res.status(404).json({ message: 'Not found' })
    }
    await res.status(200).json(contact)
  } catch (err) {
    console.error(err)
  }
})
router.patch('/:contactId/favorite', async (req, res) => {
  const { favorite } = req.body
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  })
  const validationResult = schema.validate(req.body)
  try {
    if (validationResult.error) {
      await res.status(400).json({ message: 'missing field favorite' })
      return
    }
    const contact = await updateStatusContact(favorite, req.params.contactId)
    if (contact === undefined) {
      await res.status(404).json({ message: 'Not found' })
    }
    await res.status(200).json(contact)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
