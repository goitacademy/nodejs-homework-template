const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
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
