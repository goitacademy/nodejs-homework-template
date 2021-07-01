const contacts = require('../../model/contacts.json')

const removeContact = (req, res) => {
  const { contactId } = req.params
  const index = contacts.findIndex((item) => item.id === Number(contactId))
  const deleteContacts = contacts[index]
  contacts.splice(index, 1)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: deleteContacts,
    },
  })
}

module.exports = removeContact
