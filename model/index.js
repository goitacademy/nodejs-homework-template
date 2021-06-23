const fs = require('fs/promises')
// const { required } = require('joi')
const path = require('path')

// const contacts = require('./contacts.json')
const shortid = require('shortid')
const contactsPath = path.resolve(__dirname, 'contacts.json')

const getContacts = async () => {
  const data = await fs
    .readFile(contactsPath, 'utf8')
    .then(data => JSON.parse(data))
    .catch(err => console.error(err.message))
  return data
}

const listContacts = async () => {
  const contactList = await getContacts()
  return contactList
}

const getContactById = async contactId => {
  const contactList = await getContacts()
  const idx = contactList
    .map(contact => contact.id.toString())
    .indexOf(contactId)

  if (idx === -1) {
    return false
  }
  return contactList[idx]
}

const addContact = async body => {
  try {
    const newContact = {
      id: shortid(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    }
    const oldContacts = await getContacts()
    const newContacts = JSON.stringify([...oldContacts, newContact])

    await fs.writeFile(contactsPath, newContacts, 'utf8')
    return newContact
  } catch (err) {
    console.error(err)
  }
}

const removeContact = async contactId => {
  let newContacts = []
  try {
    const oldContacts = await getContacts()
    const idx = oldContacts.map(contact => contact.id).indexOf(contactId)
    if (idx === -1) {
      return {
        message: 'Not found',
        status: 404,
      }
    }

    // eslint-disable-next-line array-callback-return
    oldContacts.filter(contact => {
      if (contact.id !== contactId) {
        newContacts = [...newContacts, contact]
      }
    })
    const newContent = JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, newContent, 'utf8')
    return {
      message: 'contact deleted',
      status: 200,
    }
  } catch (err) {
    console.error(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contactList = await listContacts()
    let changedContact = {}
    const newContactList = contactList.map(contact => {
      if (contact.id === contactId) {
        changedContact = {
          ...contact,
          ...body,
        }
        return changedContact
      } else {
        return contact
      }
    })
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), error =>
      console.error(error),
    )
    console.log(changedContact)
    return changedContact
  } catch (error) {
    return { message: 'Not found' }
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
