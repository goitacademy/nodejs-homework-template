const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const removeContactCtrl = async (req, res) => {
  const { contactId } = req.params

  const data = await Contact.findByIdAndDelete(contactId)
  if (!data) {
    throw new NotFound('Not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data: { message: 'contact deleted' },
  })
}

module.exports = removeContactCtrl
