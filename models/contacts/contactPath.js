const fs = require('fs/promises')
const path = require('path')

const contactsPath = async () => {
  const result = await fs.readFile(path.join(__dirname, './contacts.json'), 'utf8')
  return JSON.parse(result)
}

module.exports = { contactsPath }
