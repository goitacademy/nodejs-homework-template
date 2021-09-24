const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, 'contacts.json')

const updateContacts = async(newProducts) => {
  await fs.writeFile(filePath, JSON.stringify(newProducts))
}

module.exports = updateContacts
