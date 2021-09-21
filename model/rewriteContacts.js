const fs = require('fs/promises')
const path = require('path')
const filePath = path.join(__dirname, 'contacts.json')

const rewriteContacts = async (data) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = rewriteContacts
