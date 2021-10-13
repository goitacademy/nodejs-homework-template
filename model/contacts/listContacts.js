const fs = require("fs/promises")

async function listContacts() {
  const data = await fs.readFile("./contacts.json")
  const contacts = JSON.parse(data)
  return contacts
}

module.exports = listContacts;