// const db = require('./db')
const { v4: uuidv4 } = require('uuid');

// with db
// const listContacts = async () => {
//   return db.get('contacts').value()
// }

// const getContactById = async (id) => {
//   return db.get('contacts').find({ id }).value()
// }

// const removeContact = async (id) => {
//   const [record] = db.get('contacts').remove({ id }).write()
//   return record
// }

// const addContact = async (body) => {
//   const id = uuidv4()
//   const record = {
//     id,
//     ...body,
//     ...(body.name ? {} : { status: 400, message: "missing required name field" })
//   }
//   db.get('contacts').push(record).write()
//   return record
// }

// const updateContact = async (id, body) => {
//   const record = await db.get('contacts').find({ id }).assign(body).value()
//   db.write()
//   return record.id ? record : null
// }

const fs = require('fs')
const { promises: fsPromise } = fs;

async function listContacts(){
    try {
      const contactsList = await fsPromise.readFile('./model/contacts.json')
      const contactsArr = JSON.parse(contactsList.toString())
      return contactsArr
    } catch (err) {
        console.log(err.message);
    }
}

async function getContactById(contactId){
    try {
      const contactsList = await fsPromise.readFile('./model/contacts.json')
      const contactsArr = JSON.parse(contactsList.toString())
      console.log(contactsArr)
      const contactWithId = contactsArr.filter(({ id }) => id == contactId);
      console.log(contactWithId)
      return contactWithId
    } catch (err) {
      console.log(err.message);
    }
}

async function removeContact(contactId){
    try {
      const contactsList = await fsPromise.readFile('./model/contacts.json')
      const contactsArr = JSON.parse(contactsList.toString())
      const contactWithId = contactsArr.filter(({ id }) => id == contactId);
      const contacstWithoutId = contactsArr.filter(({ id }) => id != contactId);
      await fsPromise.writeFile('./model/contacts.json', JSON.stringify(contacstWithoutId));
      return contactWithId
    } catch (err) {
      console.log(err.message);
    }
}

async function addContact({ name, email, phone }) {
  try {
    const contactsList = await fsPromise.readFile('./model/contacts.json')
    const contactsArr = JSON.parse(contactsList.toString())
    const id = uuidv4()
    const newContact = {
      id: id, 
      name: name,
      email: email,
      phone: phone
    };
    contactsArr.push(newContact)
    await fsPromise.writeFile('./model/contacts.json', JSON.stringify(contactsArr));
    return newContact
    } catch (err) {
      console.log(err.message);
    }
}

async function updateContact(contactId, body ) {
    try {
      const contactsList = await fsPromise.readFile('./model/contacts.json')
      const contactsArr = JSON.parse(contactsList.toString())
      const contactWithId = contactsArr.filter(({ id }) => id == contactId);
      const updatedContact = Object.assign(...contactWithId, body)
      return updatedContact
    } catch (err) {
      console.log(err.message);
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
