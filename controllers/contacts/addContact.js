const { NotFound } = require('http-errors')

const contactsOperations = require('../../model/contacts')

const addContact = async (req, res) => {
  const result = contactsOperations.addContact(req.body)
  if (!result) {
    throw new NotFound('missing required name field')
  }
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

module.exports = addContact
