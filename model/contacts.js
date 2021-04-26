const db = require('./db')
const { ObjectId } = require('mongodb');

// with db

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find().toArray()
  return results
}

const getContactById = async (id) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectId(id)
  console.log(objectId.getTimestamp());
  const result = await collection.find({ _id: objectId }).toArray()
  return result
}

const removeContact = async (id) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectId(id)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId })
  return result
}

const addContact = async (body) => {
  const record = {
    ...body,
    ...(body.name ? {} : { status: 400, message: "missing required name field" })
  }
  const collection = await getCollection(db, 'contacts')
  const { ops: [result] } = await collection.insertOne(record)
  return result
}

const updateContact = async (id, body ) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectId(id)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set:  body  },
    { returnOriginal: false },
  )
  return result
}

// const fs = require('fs')
// const { promises: fsPromise } = fs;

// async function listContacts(){
//     try {
//       const contactsList = await fsPromise.readFile('./model/contacts.json')
//       const contactsArr = JSON.parse(contactsList.toString())
//       return contactsArr
//     } catch (err) {
//         console.log(err.message);
//     }
// }

// async function getContactById(contactId){
//     try {
//       const contactsList = await fsPromise.readFile('./model/contacts.json')
//       const contactsArr = JSON.parse(contactsList.toString())
//       console.log(contactsArr)
//       const contactWithId = contactsArr.filter(({ id }) => id == contactId);
//       console.log(contactWithId)
//       return contactWithId
//     } catch (err) {
//       console.log(err.message);
//     }
// }

// async function removeContact(contactId){
//     try {
//       const contactsList = await fsPromise.readFile('./model/contacts.json')
//       const contactsArr = JSON.parse(contactsList.toString())
//       const contactWithId = contactsArr.filter(({ id }) => id == contactId);
//       const contacstWithoutId = contactsArr.filter(({ id }) => id != contactId);
//       await fsPromise.writeFile('./model/contacts.json', JSON.stringify(contacstWithoutId));
//       return contactWithId
//     } catch (err) {
//       console.log(err.message);
//     }
// }

// async function addContact({ name, email, phone }) {
//   try {
//     const contactsList = await fsPromise.readFile('./model/contacts.json')
//     const contactsArr = JSON.parse(contactsList.toString())
//     const id = uuidv4()
//     const newContact = {
//       id: id, 
//       name: name,
//       email: email,
//       phone: phone
//     };
//     contactsArr.push(newContact)
//     await fsPromise.writeFile('./model/contacts.json', JSON.stringify(contactsArr));
//     return newContact
//     } catch (err) {
//       console.log(err.message);
//     }
// }

// async function updateContact(contactId, body ) {
//     try {
//       const contactsList = await fsPromise.readFile('./model/contacts.json')
//       const contactsArr = JSON.parse(contactsList.toString())
//       const contactWithId = contactsArr.filter(({ id }) => id == contactId);
//       const updatedContact = Object.assign(...contactWithId, body)
//       return updatedContact
//     } catch (err) {
//       console.log(err.message);
//     }
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
