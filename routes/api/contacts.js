const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})
const patchJoiSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
})
const { Contact } = require('../../model')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await Contact.findById(id)
    if (!product) {
      throw new NotFound()
    }
    res.json(product)
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404
    }
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
    if (!Object.keys(req.body).includes('favorite')) {
      req.body.favorite = false
    }

    const newContact = await Contact.create(req.body)
    res.status(201).json(newContact)
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
    }

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
    const updateContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    if (!updateContact) {
      throw new NotFound()
    }
    res.json(updateContact)
  } catch (error) {
    next(error)
  }
})
router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = patchJoiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    if (Object.keys(req.body).length === 0) {
      throw new Error('missing field favorite')
    }
    const updated = await updateStatusContact(contactId, req.body)
    res.json(updated)
  } catch (error) {
    if (error.message.includes('missing field favorite')) {
      error.status = 400
    }

    next(error)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteContact = await Contact.findByIdAndRemove(id)
    if (!deleteContact) {
      throw new NotFound()
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})
async function updateStatusContact (contactId, body) {
  const updateContact = await Contact.findByIdAndUpdate(contactId, body, { new: true })
  if (!updateContact) {
    throw new NotFound()
  }
  return updateContact
}
module.exports = router