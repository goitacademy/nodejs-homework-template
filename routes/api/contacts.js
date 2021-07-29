const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../model')

router.get('/', async (req, res, next) => {
  const contactsList = await listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: { contactsList, },
    message: 'OK',
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const id = +contactId
  const contact = await getContactById(id)

  if (contact.length === 0) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'not found',
    })
  } else {
    return res.json({
      status: 'success',
      code: 200,
      data: { contact },
      message: 'contact found',

    })
  }
})

router.post('/', async (req, res, next) => {
  const bodySchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
  })
  const { error } = bodySchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      status: 'bad request',
      code: 400,
      message: error.message,
    })
  }

  const body = req.body
  const contact = await addContact(body)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { contact },
    message: 'new contact added',
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const id = contactId
  const remove = await removeContact(id)

  if (remove === false) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } else { res.json({ message: 'contact deleted' }) }
})

router.patch('/:contactId', async (req, res, next) => {
  const bodySchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().pattern(/^(\(\d{3}\))(\s)\d{3}(-)\d{4}$/),
  })
  const { error } = bodySchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      status: 'bad request',
      code: 400,
      message: 'Phone should be in (XXX) XXX-XXXX format ',
    })
  }

  const body = req.body
  const { contactId } = req.params
  const id = +contactId

  console.log(body)
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing fields'
    })
  }

  const contactUpdate = await updateContact(id, body)
  if (!contactUpdate) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'not found'
    })
  } else {
    return res.json({
      status: 'success',
      code: 200,
      data: { contactUpdate },
      message: 'contact updated'
    })
  }
})

module.exports = router;