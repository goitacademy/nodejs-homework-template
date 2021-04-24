const db = require ('./db')
const { ObjectId } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection (db, 'contacts')
  const results = await collection.find().toArray()
 return results
}

const getContactById = async (id) => {
  const collection = await getCollection (db, 'contacts')
  const objectId = new ObjectId(id)
  const [results] = await collection.find({_id: objectId}).toArray()
 return results
}

const removeContact = async (id) => {
  const collection = await getCollection (db, 'contacts')
  const objectId = new ObjectId(id)
  const {value: result} = await collection.findOneAndDelete({_id: objectId})
    return result
}

const addContact = async (body) => {
  const record = { 
    ...body,
  }
  const collection = await getCollection (db, 'contacts')
  const {ops: [result],
  } = await collection.insertOne(record)
  return result
}

const updateContact = async (id, body) => {
  const collection = await getCollection (db, 'contacts')
  const objectId = new ObjectId(id)
  const {value: result} = await collection.findOneAndUpdate(
    {_id: objectId},
    {$set: body}, 
    {returnOriginal: false}
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
