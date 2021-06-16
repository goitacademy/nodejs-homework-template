const { uid } = require('uid')
const path = require('path')
const fs = require('fs').promises

const contactsPath = path.resolve('./model/contacts.json')

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    const parsedContacts = JSON.parse(contacts)
    return parsedContacts
  } catch (err) {
    console.error(err)
    return err
  }
}

const getContacts = async (req, res, next) => {
  const contacts = await listContacts()
  res.json({ contacts })
}

const getContactById = async (req, res, next) => {
  const contacts = await listContacts()
  const { contactId } = req.params
  const contactToFind = contacts.find((contact) => contact.id === contactId)
  if (contactToFind) {
    return res.json(contactToFind)
  }
  next()
}

const postContact = async (req, res, next) => {
  const contacts = await listContacts()
  const id = uid()
  const { name, email, phone } = req.body
  const contactToAdd = { id, name, email, phone }
  const newContacts = [...contacts, contactToAdd]
  fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8')
  res.status(201).json(contactToAdd)
}

const deleteContact = async (req, res, next) => {
  const contacts = await listContacts()
  const { contactId } = req.params
  const contactToDelete = contacts.find((contact) => contact.id === contactId)
  if (contactToDelete) {
    const newContacts = contacts.filter((contact) => contact.id !== contactId)
    fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8')
    return res.status(200).json({ message: 'contact deleted' })
  }
  next()
}

const patchContact = async (req, res, next) => {
  const contacts = await listContacts()
  const { contactId } = req.params
  const contactToPatch = contacts.find((contact) => contact.id === contactId)
  if (contactToPatch) {
    const { name, email, phone } = req.body
    contacts.forEach(contact => {
      if (contactId === contact.id) {
        if (name) {
          contact.name = name
        }
        if (email) {
          contact.email = email
        }
        if (phone) {
          contact.phone = phone
        }
        res.json({ contact })
      }
    })
    fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8')
    return
  }
  next()
}

const putContact = async (req, res, next) => {
  const contacts = await listContacts()
  const { contactId } = req.params
  const contactToPut = contacts.find((contact) => contact.id === contactId)
  if (contactToPut) {
    const { name, email, phone } = req.body
    contacts.forEach(contact => {
      if (contactId === contact.id) {
        contact.name = name
        contact.email = email
        contact.phone = phone
      }
      res.json({ contact })
    })
    fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8')
    return
  }
  next()
}

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  patchContact,
  putContact
}
