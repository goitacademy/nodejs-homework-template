const {Contact} = require("../models/contacts");

const listContactsService = async (page, limit, owner) => {
  const skip = (page - 1) * limit;
  return await Contact.find({owner}).skip(skip).limit(limit);
}

const getContactByIdService = async (contactId) => {
  return await Contact.findById(contactId) || null;
}

const removeContactService = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
}

const addContactService = async (body) => {
  return await Contact.create(body)
}

const updateContactService = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, {new: true});
}

const updateStatusContactService = async (contactId, favorite) => {
  return Contact.findByIdAndUpdate(contactId, favorite, {new: true});
}

module.exports = {
    listContactsService,
    getContactByIdService,
    removeContactService,
    addContactService,
    updateContactService,
    updateStatusContactService,
  }