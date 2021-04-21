const { MongoClient, ObjectID } = require('mongodb')
require('dotenv').config()

const { DB_URI } = process.env

const getContactColection = async () => {
  const client = await new MongoClient(DB_URI, {
    useUnifiedTopology: true
  }).connect()
  return await client.db('Contacts').collection('contacts')
}

const listContacts = async () => {
  const colection = await getContactColection()
  return await colection.find().toArray()
}

const getContactById = async contactId => {
  const objectId = new ObjectID(contactId)
  const colection = await getContactColection()

  return await colection.find({ _id: objectId }).toArray()
}

const removeContact = async contactId => {
  const objectId = new ObjectID(contactId)
  const colection = await getContactColection()
  const { value: result } = await colection.findOneAndDelete({ _id: objectId })

  return result
}

const addContact = async body => {
  const colection = await getContactColection()
  const {
    ops: [result]
  } = await colection.insertOne(body)

  return result
}

const updateContact = async (contactId, body) => {
  const objectId = new ObjectID(contactId)
  const colection = await getContactColection()

  const { value: result } = await colection.findOneAndUpdate(
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
  updateContact
}
