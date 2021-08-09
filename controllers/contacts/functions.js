const contacts = require('../../model/contacts.json')
const functionContacts = require('../../routes/api/contacts')

const listContacts = async (req, res, next) => {
  if (!contacts) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: 'Server error',
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  })
}

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const result = contacts.find((item) => item.id === id)
  if (!result) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: 'missing required name field',
    })
  } else {
    const addContactBody = { ...req.body, id: [] }
    contacts.push(addContactBody)

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: addContactBody
      }
    })
  }
}

const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId

  const newContacts = contacts.filter(contact => contact.id !== contactId)

  if (newContacts.length === contacts.length) {
    return res.status(404).json({
      message: 'Not found',
    })
  }

  res.status(200).json({
    message: `Contact ID=${contactId} deleted`,
  })
}

const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId
  const { name, email, phone } = req.body

  if (!req.body) {
    return res.status(400).json({
      message: 'missing fields',
    })
  }

  const updatedContacts = functionContacts.updateContact(
    Number(contactId),
    name,
    email,
    phone,
  )

  if (!updatedContacts) {
    return res.status(404).json({
      message: 'Not found',
    })
  }

  res.status(200).json(updatedContacts)
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
