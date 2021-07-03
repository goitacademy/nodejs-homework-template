const contacts = require('../model/contacts.json')

const update = (req, res) => {
  const { contactId } = req.params
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
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index]
    }
  })
}

module.exports = update
