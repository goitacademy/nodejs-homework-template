const dbc = require('./db')
const { ObjectId } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async (db, name) => {
  const collection = await getCollection(dbc, 'contacts')
  const results = await collection.find().toArray()
  return results
}

const getContactById = async (contactId) => {
  const collection = await getCollection(dbc, 'contacts')
  const objectId = new ObjectId(contactId)
  const [result] = await collection.find({ _id: objectId}).toArray()
  return result
}

const removeContact = async (contactId) => {
  const collection = await getCollection(dbc, 'contacts')
  const objectId = new ObjectId(contactId)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId})
  return result
}

const addContact = async (body) => {
  const record = {
    ...body,
    ...(body.favorite ? {} : { favorite: false })
  }
  const collection = await getCollection(dbc, 'contacts')
  const { ops: [result] } = await collection.insertOne(record)
  return result
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(dbc, 'contacts')
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
