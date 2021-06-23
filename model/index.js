const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const getContacts = async () => {
  const data = await fs
    .readFile(contactsPath, 'utf8')
    .then(data => JSON.parse(data))
    .catch(err => console.error(err.message))
  return data
}

async function listContacts () {
  const contactList = await getContacts()
  return contactList
}

async function getContactById (contactId) {
  const contactList = await getContacts()
  // get current array of contacts and finding needed one

  const contact = contactList.find((item) => item.id === Number(contactId))
  return contact
}

async function removeContact (contactId) {
  const contactList = await getContacts()
  // get current array of contacts and delete contact
  const index = contactList.map(contact => contact.id.toString()).indexOf(contactId)
  if (index === -1) {
    return false
  }

  const currentContacts = contactList.filter(
    ({ id }) => id.toString() !== (contactId.toString()),
  )

  fs.writeFile(contactsPath, JSON.stringify(currentContacts), (err) => {
    if (err) {
      console.error(err.message)
      return
    }
    console.log()
  })
  return { message: 'Deleted contact' }
}

async function addContact (body) {
  const { name, email, phone } = body
  const contactList = await getContacts()
  // console.log(contactList)
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  }
  const updatedContacts = [...contactList, newContact]

  fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
    if (err) {
      console.error(err.message)
    }
    // console.log('The new contact was added', newContact)
  })
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await getContacts()
  console.log(contacts)
  let newContactChange = {}

  const newContacts = contacts.map((contact) => {
    if (contact.id.toString() === contactId) {
      newContactChange = {
        ...contact,
        ...body,
      }

      return newContactChange
    } else {
      return contact
    }
  })

  await fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) =>
    console.log(err)
  )

  return newContactChange
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
