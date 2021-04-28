const Contacts = require('./schemas/contacts')
// with db


const listContacts = async () => {
  const results = await Contacts.find()
  return results
}

const getContactById = async (id) => {
  const result = await Contacts.findOne({ _id: id })
  return result
}

const removeContact = async (id) => {
  const result = await Contacts.findByIdAndRemove({ _id: id })
  return result
}

const addContact = async (body) => {
  // try {
    const results = await Contacts.create(body)
    return results
  // } catch (e) {
  //   const err = new Error(e)
  //   if (e.name === 'ValidationError') {
  //     err.status = 400
  //   }
  //   throw err
  // }
}

const updateContact = async (id, body ) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id },
    { ...body  },
    { new: true},
  )
  return result
}

const updateStatusContact = async (id, body) => {
    const result = await Contacts.findByIdAndUpdate(
    { _id: id },
    body,
    { new: true},
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
  updateContact,
  updateStatusContact
}
