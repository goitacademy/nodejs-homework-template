const Contact = require('../models/contact')


const listContacts = async () => {
  const result =  await Contact.find()
  return result
}

const getContactById = async (contactId) => {
    const result = await Contact.findOne({_id: contactId})
    return result
  }

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({_id: contactId})
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
      {_id: contactId},
      {...body},
      {new: true},
  )
  return result
}

const updateStatusContact = async (contactId, body) => {
    const result = await Contact.findByIdAndUpdate(
        {_id: contactId},
        {...body},
        {new: true},
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
