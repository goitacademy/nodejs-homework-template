const readFile = require('./readFile')

const getContactById = async contactId => {
  try {
    const contacts = await readFile()
    const contact = contacts.find(({ id }) => `${id}` === `${contactId}`)
    return contact
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getContactById