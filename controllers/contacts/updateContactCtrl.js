const { BadRequest, NotFound } = require('http-errors')

const { Contact } = require('../../models')

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing fields')
  }

  const data = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })

  if (!data) {
    throw new NotFound('form updCtr Not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data,
  })
}

module.exports = updateContactCtrl
