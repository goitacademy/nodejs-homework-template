const express = require('express')
const router = express.Router()
const { BadRequest, NotFound } = require('http-errors')

const { Contact } = require('../../models')
const { joiContactSchema, updateFavoriteJoiSchema } = require('../../models/contact')

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({}, '_id, name , email , phone , owner')
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findById(contactId, '_id, name , email , phone , owner')
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const { error } = joiContactSchema.validate(req.body)
    if (error) {
      throw new NotFound(error.message)
    }
    const newContact = { ...req.body, owner: req.user._id }
    const result = await Contact.create(newContact, '_id name email phone owner ')
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = updateFavoriteJoiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    const { favorite } = req.body
    if (!favorite) {
      throw new BadRequest('missing field favorite')
    }
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
