const fs = require('fs/promises')
const contactsPath = require('./contactsPath')

const readData = async () => {
  const result = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(result)
}

module.exports = readData
