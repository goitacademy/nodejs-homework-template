const fs = require('fs')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

function listContacts() {
  const result = fs.readFileSync(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      return console.log('listContacts', err)
    }
  })
  return JSON.parse(result)
}

function getContactById(contactId) {
  const result = fs.readFileSync(contactsPath, 'utf-8', (err) => {
    if (err) {
      console.log('getContactById', err)
    }
  })
  const data = JSON.parse(result).filter(
    (contact) => contact.id === Number(contactId)
  )
  return data
}

function removeContact(contactId) {
  const remove = fs.readFileSync(contactsPath, 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
  })
  const data = JSON.parse(remove)
  const findContact = data.find((contact) => contact.id === Number(contactId))
  const filter = data.filter((contact) => contact.id !== Number(contactId))
  const filterContact = JSON.stringify(filter)
  fs.writeFileSync(contactsPath, filterContact, (err) => {
    if (err) {
      console.log(err)
    }
  })

  return findContact
}
function addContact({ name, email, phone }) {
  const result = fs.readFileSync(contactsPath, 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
  })
  const parseData = JSON.parse(result)
  const newId = parseData.length + 1
  const contact = [{ id: newId, name, email, phone }]
  const updated = [...parseData, ...contact]
  const contactJson = JSON.stringify(updated)

  fs.writeFileSync(contactsPath, contactJson, (err) => {
    if (err) {
      console.log(err)
    }
  })
  return contact
}
function updateContact(contactId, bodyPart) {
  const contacts = fs.readFileSync(contactsPath, (err) => {
    if (err) {
      console.log(err)
    }
  })
  const data = JSON.parse(contacts)
  const findIndex = data.findIndex(
    (contact) => contact.id === Number(contactId)
  )
  if (findIndex !== -1) {
    data[findIndex] = {
      ...data[findIndex],
      ...bodyPart,
    }
    const dataContact = JSON.stringify(data)
    fs.writeFileSync(contactsPath, dataContact, (err) => {
      if (err) {
        console.log(err)
      }
    })
    return data[findIndex]
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
