const writeFile = require('./writeFile')
const readFile = require('./readFile')

const addContact = async body => {
  try {
    const contacts = await readFile()
    const id = Math.max(...contacts.map(({ id }) => id)) + 1
    const contact = { id, ...body }
    await writeFile([...contacts, contact])
    return contact
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = addContact