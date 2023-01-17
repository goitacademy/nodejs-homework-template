const Contact = require("../models/contact");

const listContacts = async (owner, skip, limit, favorite) => {
  try {
    return await Contact.find(
      favorite ? {owner, favorite} : owner,
      "-createdAt -updatedAt", 
      {skip, limit}
    ).populate("owner", "email"); 
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId, owner) => {
  try {
    return await Contact.findOne({_id: contactId, owner}, "-createdAt -updatedAt");
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body, owner) => {
  try {
    return await Contact.create(body, owner);
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId, owner) => {
  try {
    return await Contact.findOneAndRemove({_id: contactId, owner}, "-createdAt -updatedAt");
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body, owner) => {
  try {
    return await Contact.findOneAndUpdate({_id: contactId, owner}, body, "-createdAt -updatedAt");
  } catch (error) {
    console.log(error);
  }
}

const updateFavorite = async (contactId, body, owner) => {
  try {
    return await Contact.findOneAndUpdate({_id: contactId, owner}, body, "-createdAt -updatedAt");
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
  updateFavorite,
}
