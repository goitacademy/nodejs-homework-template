const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})
const contactsOperations = require('../../model/contacts')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await contactsOperations.getContactById(id)
    if (!product) {
      throw new NotFound()
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
})
// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { id } = req.params
    const updateContact = await contactsOperations.updateContact({
      id,
      ...req.body
    })
    if (!updateContact) {
      throw new NotFound()
    }
    res.json(updateContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteContact = await contactsOperations.removeContact(id)
    if (!deleteContact) {
      throw new NotFound()
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})
module.exports = router
