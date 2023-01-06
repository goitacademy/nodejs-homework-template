const Contact = require("../models/contact")

const listContacts = async () => {
  try {
    return await Contact.find(); 
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body);
  } catch (error) {
    console.log(error);
  }
}

const updateFavorite = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite
}
