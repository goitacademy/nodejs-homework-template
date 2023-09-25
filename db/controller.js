const contactModel = require('./models/schemaContacts');



const listContacts = async () => {
  const contacts = await contactModel.find({})
  return contacts
}

const getContactById = async (contactId) => {
  const contact = await contactModel.findById(contactId)
  return contact

}

const addContact = async (body) => {
const newContact = await contactModel.create(body)
return newContact
}

const removeContact = async (contactId) => {
  const removeContact = await contactModel.deleteOne({ _id: contactId})
  return removeContact
}


const updateContact = async (contactId, body) => {
  await contactModel.updateOne({_id: contactId}, body)

}


const updateStatusContact = async (contactId, body)=>{
await contactModel.updateOne({_id: contactId}, body)
  
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
