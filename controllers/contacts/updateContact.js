const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const updateContact = async (req, res) => {
  const id = req.params.contactId
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!updatedContact) {
    throw new NotFound(`Contact with id ${id} not found`)
  }
  res.json({
    status: 'sucsess',
    code: 200,
    data: { updatedContact }
  })
}
module.exports = updateContact
