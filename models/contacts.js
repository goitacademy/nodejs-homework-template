const Contact = require("../models/cont.js");


async function listContacts() {
  return await Contact.find();
}

async function getContactById(contactId) {
  return await Contact.findById(contactId);
}

async function removeContact(contactId) {
  
  return await Contact.findByIdAndRemove(contactId);
}

async function addContact(name, email, phone) {
  
  return await Contact.create({name, email, phone});
}

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });

};


async function getBuId(contactId) {
  return await Contact.findById(contactId);

};


async function updateStatusContact (contactId, body) {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return null;
  }
  contact.favorite = body.favorite;// оновлюємо
  const updatedContact = await contact.save();
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getBuId,
  updateStatusContact,
};