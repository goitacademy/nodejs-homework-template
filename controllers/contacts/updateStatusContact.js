const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId
  const { favorite } = req.body
  const updatedContact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
  if (!updatedContact) {
    throw new NotFound(`Contact with id ${id} not found`)
  }
  res.json({
    status: 'sucsess',
    code: 200,
    data: { updatedContact }
  })
}
module.exports = updateStatusContact
