const listContacts = require('./listContacts')
const updateSourceFile = require('./updateSourceFile')

const removeContact = async (contactId) => {
  try {
    const collection = await listContacts()
    const changedCollection = collection.filter(
      ({ id }) => id.toString() !== contactId
    )
    updateSourceFile(changedCollection)
    return collection.filter(({ id }) => id === contactId)
  } catch (error) {
    console.log(error)
  }
}

module.exports = removeContact