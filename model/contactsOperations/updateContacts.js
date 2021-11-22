const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '../db/contacts.json')

const updateContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data))
  // console.log(data)
}

module.exports = updateContacts
