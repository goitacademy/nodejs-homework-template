const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('db', 'contacts.json')

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())
    const contact = structuredData.find((el) => {
      return el.id === Number(contactId)
    })
    return (contact)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { getContactById }
