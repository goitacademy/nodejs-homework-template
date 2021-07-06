const contacts = require('../model/contacts.json')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const selectContact = contacts.find(item => item.id === contactId)
  if (!selectContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact this id not found'
    })
    return
  }
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact
    }
  })
}

module.exports = getContactById
