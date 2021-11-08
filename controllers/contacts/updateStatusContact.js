const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!updatedContact) {
    throw new NotFound(`Contact with id ${contactId} not found`)
  }
  res.json({
    status: 'sucsess',
    code: 200,
    data: { updatedContact }
  })
}
module.exports = updateStatusContact
