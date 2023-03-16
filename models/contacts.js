const { Contact } = require("../db/collections");

async function getContacts(owner) {
  const contacts = await Contact.find({owner});
  return contacts;
}

const getContactById = async (contactId,owner) => {
  const contactById = await Contact.findOne({ _id: contactId, owner });
  return contactById;
};

async function removeContact(contactId,owner) {
  const deletedContact = await Contact.findOneAndRemove({ _id: contactId ,owner});
  return deletedContact;
}

async function addContact({ name, email, phone, favorite },owner) {
  const newContact = await new Contact({
    name,
    email,
    phone,
    favorite,
    owner
  });
  await newContact.save();
  return newContact;
}

const updateContact = async (contactId, { name, email, phone, favorite},owner) => {
  const contactsUpdate = await Contact.findOneAndUpdate(
    { _id: contactId,owner },
    { name, email, phone, favorite},
    { new: true }
  );
  return contactsUpdate;
};

const updateStatusContact = async (contactId, {favorite },owner) => {
  const contactsUpdate = await Contact.findOneAndUpdate(
    { _id: contactId,owner },
    { favorite },
    { new: true }
  );
  return contactsUpdate;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
