

const Contact = require('../schemas/contactsSchema')

const listContacts = async () => {
  try {
    return Contact.find()
  } 
  catch (error){
    throw error;
  }

}

const getContactById = async (contactId) => {
  try {
    return Contact.findOne({ _id: contactId })
  } catch (error) {
    throw error;
  }
}

const removeContact = async (contactId) => {
  try {
  return Contact.findByIdAndRemove({ _id: contactId })
} catch (error) {
  throw error;
}
}


const addContact = async (body) => {
  try {
    return Contact.create(body)
    
  } catch (error) {
    throw error;
  }
}

const updateContact = async (contactId, body) => {
  try {
  return Contact.findByIdAndUpdate({ _id: contactId }, {...body}, { new: true })
 } catch (error) {
   throw error;
 }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
