const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('db', 'contacts.json')

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())

    const newId = Number(Date.now().toString())
    const newContact = { id: newId, name: body.name, email: body.email, phone: body.phone }

    structuredData.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(structuredData, null, 2))

    return (newContact)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { addContact }
