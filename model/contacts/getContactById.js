const listContacts = require('./listContacts.js')

const getContactById = async (contactId) => {
  console.log(contactId)
  try {
    const collection = await listContacts()
    return collection.find(({ id }) => id.toString() === contactId)
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = getContactById