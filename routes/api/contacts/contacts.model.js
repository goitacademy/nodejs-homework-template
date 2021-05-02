const { ObjectId } = require('mongodb')
const db = require('../../../model/contacts.js')

const getCollection = async (db, name) => {
  const client = await db

  return await client.db().collection(name)
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')

  return await collection.find().toArray()
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectId(contactId)
  const [result] = await collection.find({ _id: objectId }).toArray()

  return result
}

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectId(contactId)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId })

  return result
}

const addContact = async (newContact) => {
  const collection = await getCollection(db, 'contacts')

  const {
    ops: [result],
  } = await collection.insertOne(newContact)

  return result
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectId(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false }
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
