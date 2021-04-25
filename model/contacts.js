/*const db = require ('./db')
const { ObjectId } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}*/

const Contact = require('./shemas/contacts')

const listContacts = async () => {
  //const collection = await getCollection (db, 'contacts')
  const results = await Contact.find()
 return results
}

const getContactById = async (id) => {
  /*const collection = await getCollection (db, 'contacts')
  const objectId = new ObjectId(id)
  const [results] = await collection.find({_id: objectId}).toArray()
 return results*/
 const result = await Contact.findOne({_id: id})
 return result
}

const removeContact = async (id) => {
  /*const collection = await getCollection (db, 'contacts')
  const objectId = new ObjectId(id)
  const {value: result} = await collection.findOneAndDelete({_id: objectId})
    return result*/
    const result = await Contact.findByIdAndRemove({_id: id})
 return result
}

const addContact = async (body) => {
 // try {
    const result = await Contact.create(body)
 return result
 // } catch (error) {
   // const err = new Error(error)
   // if (error.name === 'ValidationError') {
   //   err.status = 400
   // }
   // throw err
 // }
 /* const record = { 
    ...body,
  }
  const collection = await getCollection (db, 'contacts')
  const {ops: [result],
  } = await collection.insertOne(record)
  return result */
}

const updateContact = async (id, body) => {
  // const collection = await getCollection (db, 'contacts')
  // const objectId = new ObjectId(id)
  const result = await Contact.findByIdAndUpdate(
    {_id: id},
    {...body}, 
    {new: true}
    )
  return result
}

const updateStatusContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    {_id: id},
    {...body}, 
    {new: true}
    )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
