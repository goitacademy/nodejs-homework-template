const getAllContacts = require('./getAllContacts')

async function getContactById(id) {
  const allContacts = await getAllContacts()
  const result = allContacts.find(contact => contact.id === id)
  if (!result) {
    return null
  }

  console.log(result)
  return result
}

module.exports = getContactById
