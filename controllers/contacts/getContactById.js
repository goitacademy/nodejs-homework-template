const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) {
    throw new NotFound(`Contact with id ${contactId} not found`)
  }
  res.json({
    status: 'sucsess',
    code: 200,
    data: { contact }
  })
}

module.exports = getContactById
