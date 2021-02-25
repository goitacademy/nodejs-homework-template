
const db = require('./db')
const { ObjectID } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  return await collection.find().toArray()
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const id = ObjectID(contactId)
  return await collection.find(id).toArray()
}

const removeContact = async (contactId) => {
  const id = ObjectID(contactId)
  const collection = await getCollection(db, 'contacts')
  const { value: result } = await collection.findOneAndDelete({ _id: id })
  return result
}

const addContact = async (body) => {
  const collection = await getCollection(db, 'contacts')
  const {
    ops: [result]
  } = await collection.insertOne(body)
  return result
}

const updateContact = async (contactId, body) => {
  try {
    const collection = await getCollection(db, 'contacts')
    const id = ObjectID(contactId)
    const query = {
      _id: id
    }
    const options = { set: true }
    const updates = { $set: body }

    const { value: result } = await collection.findOneAndUpdate(query, updates, options)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}