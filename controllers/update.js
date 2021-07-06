const contacts = require('../model/contacts.json')
const updateJson = require('./updateJSON')

const updateContact = async (req, res) => {
  const { contactId } = req.params
  // const { name, email, phone } = req.body
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    return
  }
  contacts[index] = { ...req.body, _id: contactId }
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index]
    }
  })
  updateJson(contacts)
}

module.exports = updateContact
