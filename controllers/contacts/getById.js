const contacts = require('../../model/contacts.json')

const getById = (req, res) => {
  const { contactId } = req.params
  const contact = contacts.find((item) => item.id === Number(contactId))
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    return
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contact,
    },
  })
}

module.exports = getById
