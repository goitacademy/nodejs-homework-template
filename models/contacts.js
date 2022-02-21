const { randomUUID } = require('crypto')
const DB = require('../db/adapterDB')

const db = new DB('../db/contacts.json')

const getContactsModel = async () => {
  return await db.read()
}

const getContactByIdModel = async (contactId) => {
  const contacts = await getContactsModel()
  return contacts.find((el) => el.id === contactId)
}

const addContactModel = async (body) => {
  const contacts = await getContactsModel()
  const newContact = { id: randomUUID(), ...body }
  contacts.push(newContact)
  await db.write(contacts)
  return newContact
}

const updateContactPutModel = async (contactId, body) => {
  const contacts = await getContactsModel()
  const contactIndex = contacts.findIndex((el) => el.id === contactId)
  if (contactIndex === -1) return null
  contacts[contactIndex] = {
    id: contactId,
    ...contacts[contactIndex],
    ...body,
  }
  await db.write(contacts)
  return contacts[contactIndex]
}

const updateContactPatchModel = async (contactId, { name, email, phone }) => {
  const contacts = await getContactsModel()
  const contactIndex = contacts.findIndex((el) => el.id === contactId)
  if (contactIndex === -1) return null
  if (contacts[contactIndex].name !== name && name)
    contacts[contactIndex].name = name
  if (contacts[contactIndex].email !== email && email)
    contacts[contactIndex].email = email
  if (contacts[contactIndex].phone !== phone && phone)
    contacts[contactIndex].phone = phone
  await db.write(contacts)
  return contacts[contactIndex]
}

const deleteContactModel = async (contactId) => {
  const contacts = await getContactsModel()
  const contactIndex = contacts.findIndex((el) => el.id === contactId)
  if (contactIndex !== -1) {
    const deleteContact = contacts.splice(contactIndex, 1)
    await db.write(contacts)
    return deleteContact
  }
  return null
}

module.exports = {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  updateContactPutModel,
  updateContactPatchModel,
  deleteContactModel,
}
