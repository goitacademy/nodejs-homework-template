const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../model/index')

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).min(1)

router.get('/', async (req, res, next) => {
  try {
    res.json(await listContacts())
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contacts = await getContactById(contactId)
    if (!contacts) {
      throw new NotFound()
    }
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  const body = req.body
  try {
    const { error } = joiShema.validate(body)
    if (error) {
      throw new BadRequest('missing required name field')
      // const error = new Error('missing required name field')
      // error.status = 400
      // throw error
    }
    const contacts = await addContact(body)
    res.status(201).json(contacts)
    console.log(req.body)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await removeContact(contactId)
    if (!deleteContact) {
      throw new NotFound()
    }
    res.json({ message: 'contact deleteds' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body)
    if (error) {
      throw new BadRequest('missing fields')
      // const error = new Error('missing fields')
      // error.status = 400
      // throw error
    }
    const { contactId } = req.params
    const updateContactById = await updateContact(contactId, req.body)
    if (updateContactById) {
      res.json(updateContactById)
    } else {
      throw new NotFound()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
