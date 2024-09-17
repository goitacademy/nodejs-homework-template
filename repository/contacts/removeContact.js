const writeFile = require('./writeFile')
const readFile = require('./readFile')

const removeContact = async contactId => {
  try {
    const contacts = await readFile()
    if (contacts.find(({ id }) => `${id}` === `${contactId}`)) {
      const filteredContacts = contacts.filter(
        ({ id }) => `${id}` !== `${contactId}`,
      )
      await writeFile(filteredContacts)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = removeContact