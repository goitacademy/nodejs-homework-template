const fsPromises = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

async function readFiles(patch) {
  try {
    const file = await fsPromises.readFile(patch, 'utf-8')
    const list = JSON.parse(file)
    return list
  } catch (err) {
    console.log(err)
  }
}

async function writeFiles(patch, data) {
  try {
    await fsPromises.writeFile(patch, JSON.stringify(data), 'utf-8')
  } catch (err) {
    console.log(err)
  }
}

async function listContacts() {
  try {
    const contacts = await readFiles(contactsPath)
    return contacts
  } catch (err) {
    console.log(err)
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readFiles(contactsPath)
    return contacts.filter(el => el.id === Number(contactId))
  } catch (err) {
    console.log(err)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readFiles(contactsPath)
    const data = contacts.filter(el => el.id !== Number(contactId))
    console.log(contactId)
    if (data.length !== contacts.length) {
      await writeFiles(contactsPath, data)
      return true
    }
    return false
  } catch (err) {
    console.log(err)
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readFiles(contactsPath)
    const data = [...contacts, { id: contacts[contacts.length - 1].id + 1, name, email, phone }]
    await writeFiles(contactsPath, data)
  } catch (err) {
    console.log(err)
  }
}

async function updateContact(contactId, body) {
  try {
    const contacts = await readFiles(contactsPath)
    const data = contacts.map(el => el.id === Number(contactId) ? { ...el, ...body } : el)
    const updateOneContact = data.find(el => el.id === Number(contactId))
    if (updateOneContact) {
      await writeFiles(contactsPath, data)
      return updateOneContact
    }
    return false
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
