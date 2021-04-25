// const db = require('./mongoDB/db')
// const {ObjectID} = require('mongodb')
const contacts = require('../model/schemas/contact')


// const getCollection = async (db, name) => {
//   const client = await db
//   const collection = await client.db().collection(name)
//   return collection
// }

const listContacts = async () => {
  // const collection = await getCollection(db, 'contacts')
  // const results = await collection.find().toArray()
  const results = await contacts.find()
  return results

}

const getContactById = async (id) => {
  // const collection = await getCollection(db, 'contacts')
  // const objectid = new ObjectID(id)
  // const [result] = await collection.find({_id: objectid}).toArray()
  const result = await contacts.findOne({_id: id})
  return result
}

const removeContact = async (id) => {
  // const collection = await getCollection(db, 'contacts')
  // const objectid = new ObjectID(id)
  // const { value: result } = await collection.findOneAndDelete({ _id: objectid })
  const result = await contacts.findByIdAndRemove({ _id: id })
  return result
  
}



const addContact = async (body) => {
  // const collection = await getCollection(db, 'contacts')
  // const recordContact = {
  //   ...body
  // }
  // const  {ops: [result]}  = await collection.insertOne(recordContact)

  const result = await contacts.create(body)
    return result
}

const updateContact = async (id, body) => {
  // const collection = await getCollection(db, 'contacts')
  // const objectid = new ObjectID(id)
  // const { value: result } = await collection.findOneAndUpdate({ _id: objectid }, { $set: body }, { returnOriginal: false })

  const result = await contacts.findByIdAndUpdate({ _id: id }, { ...body}, {new: true})
  return result
}

 module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
