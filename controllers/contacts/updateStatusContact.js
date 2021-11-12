const { BadRequest, NotFound } = require('http-errors')

const { Contact } = require('../../models')

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params

  if (!req.body) {
    throw new BadRequest('missing field favorite')
  }

  const data = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })

  if (!data) {
    throw new NotFound('form status Not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data
  })
}

module.exports = updateStatusContact
