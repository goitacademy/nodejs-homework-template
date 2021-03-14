const Contact = require('./schemas/contact')

const listContacts = async () => {
  const results = await Contact.find({})
  return results
}

const getContactById = async (id) => {
  const result = await Contact.findOne({ _id: id })
  console.log(result.id)
  console.log(result._id)
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  )
  return result
}

const removeContact = async (id) => {
  const result = await Contact.findByIdAndDelete({ _id: id })
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
