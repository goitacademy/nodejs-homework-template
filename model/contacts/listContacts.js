const fs = require('fs').promises
const contactsPath = require('./contactsPath')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const list = JSON.parse(data)
    return list
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = listContacts