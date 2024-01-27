const mongoose = require('mongoose');
const { Schema } = mongoose;


const contactSchema = new Schema({
 
});


const Contact = mongoose.model('Contact', contactSchema);


const listContacts = async () => {
  return await Contact.find();
}

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
}

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
}

const addContact = async (body) => {
  return await Contact.create(body);
}

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
