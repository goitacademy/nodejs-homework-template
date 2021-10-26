const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('db', 'contacts.json')

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())
    const target = structuredData.find((el) => {
      return el.id === Number(contactId)
    })
    if (target) {
      const newData = structuredData.filter((el) => {
        return el.id !== Number(contactId)
      })
      await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2))
      return (target)
    }
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { removeContact }
