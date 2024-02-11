const Contact = require("./schemas/contactSchema");
const mongoose = require("mongoose");

function validateObjectId(contactId) {
  if (!mongoose.isValidObjectId(contactId)) {
    throw new Error("Not Found. It is not a valid ID.");
  }
}

async function getContactsAll() {
  try {
    return await Contact.find();
  } catch (error) {
    throw error;
  }
}
async function getContactById(contactId) {
  try {
    validateObjectId(contactId);
    return await Contact.findById(contactId);
  } catch (error) {
    throw error;
  }
}
async function removeContact(contactId) {
  try {
    validateObjectId(contactId);
    return await Contact.deleteOne({ _id: { $eq: contactId } });
  } catch (error) {
    throw error;
  }
}
async function addContact(contactData) {
  try {
    return await Contact.create(contactData);
  } catch (error) {
    throw error;
  }
}
async function upDateContact(contactId, updatedData) {
  try {
    validateObjectId(contactId);
    return await Contact.findByIdAndUpdate(contactId, updatedData, {
      new: true,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getContactsAll,
  getContactById,
  removeContact,
  addContact,
  upDateContact,
};
