const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('db', 'contacts.json')

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())

    const target = structuredData.find((el) => {
      return el.id === Number(contactId)
    })
    if (target) {
      const renewedContact = { ...target, ...body }
      const newData = structuredData.map(contact => {
        return (contact.id === Number(contactId) ? renewedContact : contact)
      })
      await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2))
      return (renewedContact)
    }
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { updateContact }
