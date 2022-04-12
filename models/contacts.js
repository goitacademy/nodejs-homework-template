const {ObjectId} = require('mongodb')
const DB = require('./db')

const getCollection = async(db, nameCollection) => {
  const client = await db
  const collection = await client.db().collection(nameCollection)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection(DB, 'contacts')
  const result = await collection.find({}).toArray()
  console.log(result)
  return result
}

const getContactById = async (contactId) => {
   const collection = await getCollection(DB, 'contacts')
   const objId = new ObjectId(contactId)
  console.log(objId.getTimestamp())
  const [result] = await collection.find({_id: objId}).toArray()
  return {...result, createAt: objId.getTimestamp()}
}

const removeContact = async (contactId) => {
    const collection = await getCollection(DB, 'contacts')
    const objId = new ObjectId(contactId)
    const {value: result} = await collection.findOneAndDelete({_id: objId,})
    return result
}

const addContact = async (body) => {
  const collection = await getCollection(DB, 'contacts')
  const newContacts = {
    email: false,
    ...body,
  }
  const result = await collection.insertOne(newContacts) 
  return await getContactById(result.insertedId)
}

const updateContact = async (contactId, body) => {
   const collection = await getCollection(DB, 'contacts')
    const objId = new ObjectId(contactId)
    const {value: result} = await collection.findOneAndUpdate(
      {_id: objId}, {$set: body}, {returnDocument: 'after'},
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