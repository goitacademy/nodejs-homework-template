const { v4 } = require('uuid')

const contactSchema = require('../utils/validate')

const contacts = require('../model/contacts.json')
const updateJson = require('./updateJSON')

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    await res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return
  }
  const newContact = { id: v4(), ...req.body }
  contacts.push(newContact)

  await res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact
    }
  })
  updateJson(contacts)
}

module.exports = addContact
