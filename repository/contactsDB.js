const Contact = require('../model/contact')


const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({contactId, owner: userId}).populate({
    path: 'owner',
    select: 'email subscription createdAt updatedAt',
  })
  return result
}

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({_id: contactId, owner: userId})
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

const getContactsByUser = async (id) => {
  const results = await Contact.find({owner: id}).populate({
    path: 'owner',
    select: 'email subscription createdAt updatedAt',
  })
  return results
}


module.exports = {
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getContactsByUser,
}
