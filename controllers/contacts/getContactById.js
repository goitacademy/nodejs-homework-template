const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const getContactById = async (req, res) => {
  const id = req.params.contactId
  const contact = await Contact.findById(id)
  if (!contact) {
    throw new NotFound(`Contact with id ${id} not found`)
  }
  res.json({
    status: 'sucsess',
    code: 200,
    data: { contact }
  })
}

module.exports = getContactById
