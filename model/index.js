const dataContacts = require('./schemas/contactSchema')

const listContacts = async () => {
  const results = await dataContacts.find({})

  return results
}

const getContactById = async (id) => {
  const results = await dataContacts.findOne({ _id: id })
  return results
}

const removeContact = async (id) => {
  const result = await dataContacts.findByIdAndRemove(id)
  return result
}

const addContact = async (body) => {
  const result = await dataContacts.create(body)
  return result
}

const updateContact = async (id, body) => {
  const result = await dataContacts.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
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