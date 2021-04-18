// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const db = require ('./db')
const { v4: uuidv4 } = require('uuid');
const { find } = require('./db');

const listContacts = async () => {
  return db.get('contacts').value()
}

const getContactById = async (id) => {
  return db.get('contacts').find({id}).value()
}

const removeContact = async (id) => {
  const [record] = db.get('contacts').remove({id}).write()
    return record
}

const addContact = async (body) => {
  const id = uuidv4()
  const record = {
    id,
    ...body,
  }
  db.get('contacts').push(record).write()
  return record
}

const updateContact = async (id, body) => {
  const record = db.get('contacts').find({id}).assing(body).value()
  //console.log(record)
  db.write()
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
