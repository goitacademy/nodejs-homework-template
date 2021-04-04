
const { contactsService } = require('../services')
const Joi = require('joi')
const { v4 } = require('uuid')

const get = async (req, res, next) => {
  const { query = {} } = req
  try {
    const data = await contactsService.getContacts(query)
    res.statusCode = 200
    res.json({
      message: 'Все ок',
      result: data
    })
  } catch (err) {
    console.log(err)
  }
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const data = await contactsService.getContactById(contactId)
    if (data) {
      res.statusCode = 200
      res.json({
        message: 'Все ок',
        result: data
      })
    } else {
      res.statusCode = 404
      res.json({ message: 'Contact not found' })
    }
  } catch (err) {
    console.log(err)
  }
}

const add = async (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
    favorite: Joi.boolean().default(false)
  })
  try {
    await contactSchema.validateAsync(req.body)
    const body = {
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite
    }

    const data = await contactsService.addContact(body)
    res.statusCode = 201
    res.json(data)
  } catch (err) {
    res.statusCode = 400
    res.json({
      status: 'Error',
      message: err.details[0].message
    })
  }
}

const remove = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const data = await contactsService.removeContact(contactId)
    if (data) {
      res.statusCode = 200
      res.json({
        message: 'contact deleted',
        result: data
      })
    } else {
      res.statusCode = 404
      res.json({ message: 'Contact not found' })
    }
  } catch (err) {
    console.log(err)
  }
}

const update = async (req, res, next) => {
  const { contactId } = req.params
  const contactSchema = Joi.object({

    name: Joi.any(),
    email: Joi.any(),
    phone: Joi.any()

  }).or('name', 'email', 'phone')
  try {
    await contactSchema.validateAsync(req.body)

    const body = req.body

    const data = await contactsService.updateContact(contactId, body)
    res.statusCode = 201
    res.json(data)
  } catch (err) {
    res.statusCode = 404

    res.json({ message: 'Contact not found' })
  }
}

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const contactSchema = Joi.object({

    favorite: Joi.required()

  })
  try {
    await contactSchema.validateAsync(req.body)
    const body = {

      favorite: req.body.favorite
    }

    const data = await contactsService.updateStatusContact(contactId, body)
    res.statusCode = 201
    res.json(data)
  } catch (err) {
    res.statusCode = 404

    res.json({ message: 'Contact not found' })
  }
}

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
  updateById
}
