
const Contact = require("../models/cont.js");


async function listContacts(req, res) {
  const { _id, owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
 return await Contact.find({ owner }, {skip, limit}).populate("owner", "name email");
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

const listFilteredContacts = async (favorite) => {
  const contacts = await listContacts();

  if (favorite !== undefined) {
    return contacts.filter(contact => contact.favorite === (favorite === 'true'));
  } else {
    return contacts;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getBuId,
  updateStatusContact,
  listFilteredContacts, 
};