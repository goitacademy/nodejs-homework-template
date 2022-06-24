const {Contact} = require('../models/schemas/contact');


const listContacts = async (id) => {
  return await Contact.find({owner: id}).populate("owner", "_id email");
}

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId });
}


const removeContact = async (contactId) => {
 return Contact.findByIdAndRemove({ _id: contactId });
}

const addContact = async (body, id) => {
  return await Contact.create({ ...body, owner: id });
}

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {new: true});
}

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {new: true});
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
