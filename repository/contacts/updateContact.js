const writeFile = require('./writeFile')
const readFile = require('./readFile')

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readFile()

    for (let i = 0; i < contacts.length; i++) {
      if (`${contacts[i].id}` === `${contactId}`) {
        const updContact = { ...contacts[i], ...body }
        contacts[i] = updContact
        await writeFile(contacts)
        return updContact
      }
    }
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = updateContact