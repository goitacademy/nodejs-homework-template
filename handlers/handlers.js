let contacts = require('../data/contacts.json')
const { v4 } = require('uuid')

const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number()
})

const listContacts = async (req, res, next) => {
  res.json(contacts)
}

const getContactById = (req, res) => {
  const { contactId } = req.params

  const selectedContact = contacts.find(item => item.id === contactId)
  if (!selectedContact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      data: {
        message: 'Not found'
      }
    })
  }
  res.status(200).json({
    status: 'succsess',
    code: 200,
    data: {
      result: selectedContact
    }
  })
}

const removeContact = (req, res) => {
  const { contactId } = req.params
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      data: {
        message: 'Not found'
      }
    })
    return
  }

  const newContact = contacts.filter(item => item.id !== parseInt(contactId))
  contacts = newContact

  res.json({
    status: 'succsess',
    code: 200,
    data: {
      message: 'contact deleted'
    }
  })
}

const addContact = (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: {
        message: 'bad request'
      }
    })
    return
  }
  const newContact = { id: v4(), ...req.body }
  contacts.push(newContact)
  res.status(201).json({
    status: 'succsess',
    code: 201,
    data: {
      result: newContact
    }
  })
}

const updateContact = (req, res) => {
  const { contactId } = req.params
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      data: {
        message: 'Not found'
      }
    })
    return
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: {
        message: 'missing fields'
      }
    })
    return
  }
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: {
        message: 'bad request'
      }
    })
    return
  }
  contacts[index] = { id: contactId, ...req.body }
  res.status(201).json({
    status: 'succsess',
    code: 200,
    data: {
      result: contacts[index]
    }
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
