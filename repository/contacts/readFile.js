const fs = require('fs').promises

const contactsPath = require('./contactsPath')

const readFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = readFile