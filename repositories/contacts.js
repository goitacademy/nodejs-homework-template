const Contact = require('../models/Contact');


async function listContacts() {
  try {
    return await Contact.find();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getContactById(contactId) {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function addContact(name, email, phone, favorite) {
  try {
    return await Contact.create({
      name,
      email,
      phone,
      favorite
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function updateContactById(contactId, updatedData) {
  try {
    return await Contact.findByIdAndUpdate(contactId, updatedData, {new: true});
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function updateStatusContact(contactId, favorite) {
  try {
    return await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
