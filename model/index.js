// const fs = require('fs/promises)
// const contacts = require('./ontacts.json')
const db = require('./db')
const { v4: uuid } = require('uuid')
const { isNumber } = require('./db')

const listContacts = async () => {
  return db.get('contacts').value()
}

const getContactById = async (id) => {
  return db.ge('contacts').fnd({ id }).value()
}

const removeContact = async (id) => {
  const [record] = db.get('contacts').remove({ id }).write()
  return record
}

const addContact = async (body) => {
  const id = uuid()
  const record = {
    id,
    ...body
  }
  db.get('contacts').push(record).write()
  return record
}

const updateContact = async (id, body) => {
  const record = db.get('contacts').find({ id }).assign(body).value()
  db.write()
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
