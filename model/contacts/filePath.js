const path = require('path')
// const { fileURLToPath } = require('url')
// const { dirname } = require('path')

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const contactsPath = path.join(__dirname, '..', 'contacts', 'contacts.json')

module.exports = contactsPath
