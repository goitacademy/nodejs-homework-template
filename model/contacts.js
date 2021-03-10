

const db = require('./db')
const { ObjectID } = require('mongodb')


const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find({}).toArray()
  return results
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(id)
  console.log(objectId.getTimestamp())
  const [result] = await collection.find({ _id: objectId }).toArray()
  return result
}

const addContact = async (body) => {
  const record = {
    ...body
  }
  const collection = await getCollection(db, 'contacts')
  const {
    ops: [result],
  } = await collection.insertOne(record)
  return result
}

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(id)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId })
  return result
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(id)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
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
