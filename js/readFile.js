const fs = require('fs/promises')

const readFile = async (filePath) => {
  try {
    const getheredContacts = await fs.readFile(filePath, 'utf8')
    return JSON.parse(getheredContacts)
  } catch (err) {
    console.error('There is no such file or directory!')
    console.error(err.message)
  }
}

module.exports = readFile
