const { BadRequest } = require('http-errors')
const { add } = require('../../models/contacts')

const addContact = async (req, res, next) => {
  const contact = await add(req.body)
  if (!contact) {
    throw new BadRequest('Contact already exist')
  }
  res.status(201).json({
    status: 'sucsess',
    code: 201,
    data: { contact }
  })
}
module.exports = addContact
