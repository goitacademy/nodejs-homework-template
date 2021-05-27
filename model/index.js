const {ObjectId} = require('mongodb')

const listContacts = async (client) => {
  const result = await client.db().collection('contacts').find({}).toArray()
  return result
}

const getContactById = async (client, contactId) => {
  try {
    const id = ObjectId(contactId)
    const [contact] = await client.db().collection('contacts').find({_id: id}).toArray()
    return contact
  } catch {
    return {}
  }
}

const removeContact = async (client, contactId) => {
  try {
    const id = ObjectId(contactId)
    const {value: contact} = await client.db().collection('contacts').findOneAndDelete({_id: id})
    return contact
  } catch {
    return null
  }
}

const addContact = async (client, body) => {
  try {
    const record = {
      ...body,
      ...(body.favorite ? {} : {favorite: false})
    }
    const {ops: [response]} = await client.db().collection('contacts').insertOne(record)
    console.log(response)
    return response
  } catch {
    return {}
  }
}

const updateContact = async (client, contactId, body) => {
  try {
    const id = ObjectId(contactId)
    const {value: updatedContact} = await client.db().collection('contacts').findOneAndUpdate(
      {_id: id},
      {$set: body},
      {returnOriginal: false}
    )
    return updatedContact
  } catch {
    return {}
  }
}

const updateStatusContact = async (client, contactId, body) => {
  try {
    const id = ObjectId(contactId)
    const {value: updatedContact} = await client.db().collection('contacts').findOneAndUpdate(
      {_id: id},
      {$set: body},
      {returnOriginal: false}
    )
    return updatedContact
  } catch {
    return {}
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
