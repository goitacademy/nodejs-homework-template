const contactsOperations = require('../../models/contacts')

const listContacts = async (req, res) => {
  const result = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = listContacts
