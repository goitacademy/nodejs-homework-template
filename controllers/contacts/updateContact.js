const { NotFound, BadRequest } = require('http-errors')
const { update } = require('../../models/contacts')

const updateContact = async (req, res, next) => {
  const idNormalize = Number(req.params.contactId)
  const updatedContact = await update(idNormalize, req.body)
  if (updatedContact === 'Contact not found') {
    throw new NotFound(`Contact with id ${idNormalize} not found`)
  }
  if (updatedContact === 'Contact already exist') {
    throw new BadRequest(updatedContact)
  }
  res.json({
    status: 'sucsess',
    code: 200,
    data: { updatedContact }
  })
}
module.exports = updateContact
