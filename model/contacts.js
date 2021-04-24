const db = require('./mongoDB/db')
const {ObjectID} = require('mongodb')


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
  const objectid = new ObjectID(id)
  const [results] = await collection.find({_id: objectid}).toArray()
  return results
}

const removeContact = async (id) => {
  const collection = await getCollection(db, 'contacts')
  const objectid = new ObjectID(id)
  const { value: result } = await collection.findOneAndDelete({ _id: objectid })
  return result
  
}



const addContact = async (body) => {
  const collection = await getCollection(db, 'contacts')
  const recordContact = {
    ...body
  }
  const  {ops: [result]}  = await collection.insertOne(recordContact)
    return result
 
}

const updateContact = async (id, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectid = new ObjectID(id)
  const { value: result } = await collection.findOneAndUpdate({ _id: objectid }, { $set: body}, {returnOriginal: false})
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
