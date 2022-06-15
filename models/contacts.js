const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')
const shortid = require('shortid');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const listContacts = async () => {
  const list = JSON.parse(await fs.readFile(contactsPath))
  return list
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contactId === contact.id)

  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  console.log(result);
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts()
   const {
     name,
     email,
     phone
   } = body;

   const newContact = {
     id: shortid.generate(),
     name,
     email,
     phone,
  }

  contacts.push(newContact)
  await updateContacts(contacts)
  
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
   if (index === -1) {
     return null;
   }

  contacts[index] = { contactId, ...body }
  await updateContacts(contacts)
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContacts,
}