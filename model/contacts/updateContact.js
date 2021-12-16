const updateSourceFile = require('./updateSourceFile')
const listContacts = require('./listContacts')

const updateContact = async ({ id, name, email, phone }) => {
  try {
    const collection = await listContacts()
    const index = collection.findIndex((item) => item.id.toString() === id)
    if (index === -1) {
      return null
    }
    collection[index] = { id, name, email, phone }
    await updateSourceFile(collection)
    return collection[index]
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateContact
