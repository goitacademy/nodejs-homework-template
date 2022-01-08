const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const { authenticate } = require('../../middlewares')

const { Contact } = require('../../models')
const { joiSchema, patchFavoriteJoiSchema } = require('../../models/contact')

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite } = req.query
    const { _id } = req.user
    const skip = (page - 1) * limit
    let contacts = await Contact.find(
      { owner: _id, favorite },
      '-createdAt -updatedAt',
      {
        skip,
        limit: Number(limit),
      }
    )
    // доп задание 2  - фильтрация результатов по параметру favorite
    if (favorite === undefined) {
      contacts = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {
        skip,
        limit: Number(limit),
      })
    }
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', authenticate, async (req, res, next) => {
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
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    if (!Object.keys(req.body).includes('favorite')) {
      req.body.favorite = false
    }
    const { _id } = req.user

    const newContact = await Contact.create({ ...req.body, owner: _id })
    res.status(201).json(newContact)
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
    }

    next(error)
  }
})

router.put('/:id', authenticate, async (req, res, next) => {
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
router.patch('/:contactId/favorite', authenticate, async (req, res, next) => {
  try {
    const { error } = patchFavoriteJoiSchema.validate(req.body)
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

router.delete('/:id', authenticate, async (req, res, next) => {
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
