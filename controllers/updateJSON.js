const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const updateJson = async (contacts) => {
  const str = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, str)
}

module.exports = updateJson
