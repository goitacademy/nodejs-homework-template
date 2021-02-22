const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const fetchContacts = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

const rewriteContacts = async (contacts) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const listContacts = async () => {
  const listContacts = await fetchContacts()
  return listContacts
}

const getContactById = async (contactId) => {
  const listContacts = await fetchContacts()
  const contact = listContacts.find(({ id }) => String(id) === contactId)
  // привожу все id к строке String(id) поскольку в .json id это и строки и числа
  return contact
}

const removeContact = async (contactId) => {
  const listContacts = await fetchContacts()
  const isIdExist = !!listContacts.find(({ id }) => String(id) === contactId)
  if (isIdExist) {
    const filteredContacts = listContacts.filter(
      ({ id }) => String(id) !== contactId
    )
    await rewriteContacts(filteredContacts)
  }
  return isIdExist // если равны то ничего не удалил
}

const addContact = async (body) => {
  const id = uuidv4()
  const newContact = {
    id,
    ...body,
  }

  const listContacts = await fetchContacts()
  listContacts.push(newContact)
  await rewriteContacts(listContacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const listContacts = await fetchContacts()
  const searchResultFromList = listContacts.find(
    ({ id }) => String(id) === contactId
  )

  if (!searchResultFromList) {
    return { updateStatus: false }
  } else {
    const updatedContact = { ...searchResultFromList, ...body }
    const filteredContacts = listContacts.filter(
      ({ id }) => String(id) !== contactId
    )
    filteredContacts.push(updatedContact)
    await rewriteContacts(filteredContacts)
    return { updated: updatedContact, updateStatus: true }
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
