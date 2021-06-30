const { contactSchema } = require('../../utils/validateSchemas')
const contacts = require('../../model/contacts.json')
const updateFile = require('./updateFile')

const updateContact = (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 404,
      message: error.message,
    })
    return
  }
  const { contactId } = req.params
  const index = contacts.findIndex((item) => item.id === Number(contactId))
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    return
  }
  contacts[index] = { ...req.body, contactId }
  updateFile(contacts)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index],
    },
  })
}

module.exports = updateContact
