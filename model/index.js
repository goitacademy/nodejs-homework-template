const db = require('./db')
const { ObjectId } = require('mongodb')

// === helper ===
const getCollection = async (db, name) => {
  const client = await db

  return await client.db().collection(name)
}

// === ADD new contact ===
const addContact = async body => {
  const contact = {
    ...body,
    ...(body.email ? {} : { email: 'fill in!' }),
  }
  const collection = await getCollection(db, 'contacts')
  const {
    ops: [result],
  } = await collection.insertOne(contact)

  return result
}

// === GET all contacts ===
const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')

  return await collection.find({}).toArray()
}

// === GET contact by ID ===
const getContactById = async contactId => {
  const collection = await getCollection(db, 'contacts')
  const objectId = ObjectId(contactId)
  const [result] = await collection.find({ _id: objectId }).toArray()

  return result
}

// === UPDATE contact ===
const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = ObjectId(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
  )

  return result
}

// === REMOVE contact by ID ===
const removeContact = async contactId => {
  const collection = await getCollection(db, 'contacts')
  const objectId = ObjectId(contactId)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId })

  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
