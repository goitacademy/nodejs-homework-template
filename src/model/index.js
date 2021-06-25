const fs = require('fs/promises')

const path = require('path')
const contactsPath = path.join('./src/model/contacts.json')

//  const contacts = await result.find({}).toArray()
//     console.log(contacts)

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data).find((item) => item.id === Number(contactId))
  } catch (err) {
    console.log(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const findId = JSON.parse(data).find(
      (item) => item.id === Number(contactId)
    )
    const newData = JSON.parse(data).filter(
      (item) => item.id !== Number(contactId)
    )
    await fs.writeFile(contactsPath, JSON.stringify(newData), 'utf8')
    return findId
  } catch (err) {
    console.log(err)
  }
}
removeContact()

const addContact = async (body) => {
  const { name, email, phone } = body
  const newContact = {
    id: Date.now(),
    name,
    email,
    phone,
  }
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const newData = [...JSON.parse(data), newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newData), 'utf8')
    return newContact
  } catch (err) {
    console.log(err)
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const findId = JSON.parse(data).find(
      (item) => item.id === Number(contactId)
    )

    if (!findId) {
      return false
    }

    const newData = JSON.parse(data).map((item) => {
      if (item.id === Number(contactId)) {
        if (name) {
          item.name = name
        }
        if (email) {
          item.email = email
        }
        if (phone) {
          item.phone = phone
        }
      }
      return item
    })
    await fs.writeFile(contactsPath, JSON.stringify(newData), 'utf8')
    return getContactById(contactId)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
