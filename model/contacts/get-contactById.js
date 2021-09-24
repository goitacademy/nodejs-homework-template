const listContacts = require('./get-contactsList')

const getContactById = async contactId => {
  const contacts = await listContacts()
  const contact = contacts.find(i => {
    //console.log(i)
    console.log(contactId.toString())
    return i.id.toString() === contactId.toString()
  })
  if (!contact) {
    return null
  }
  return contact
}

module.exports = getContactById
