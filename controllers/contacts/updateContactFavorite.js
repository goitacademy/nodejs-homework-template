const { Contact } = require('../../models/contact')
const { BadRequest, NotFound } = require('http-errors')

const updateContactFavorite = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  if (!favorite) {
    throw new BadRequest('missing field favorite')
  }
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = updateContactFavorite
