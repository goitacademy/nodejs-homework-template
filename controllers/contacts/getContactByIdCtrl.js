const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const getContactByIdCtrl = async (req, res) => {
  const { contactId } = req.params

  const data = await Contact.findById(contactId)
  if (!data) {
    throw new NotFound('Not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data
  })
}

module.exports = getContactByIdCtrl
