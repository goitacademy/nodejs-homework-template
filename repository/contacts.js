// const {ObjectId} = require('mongodb')
// const DB = require('../config/db')
const Contact = require('../models/contacts')


// const getCollection = async(db, nameCollection) => {
//   const client = await db
//   const collection = await client.db().collection(nameCollection)
//   return collection
// }

const listContacts = async () => {
  const result = await Contact.find({})
  return result
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({_id: contactId}) // Contact.findById({_id: objId})
  return result
}

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({_id: contactId})
  return result
}

const addContact = async (body) => {
  const result = await Contact.Create(body) 
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
      {_id: contactId}, {...body}, {new: true},
    )
    return result
} 

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}