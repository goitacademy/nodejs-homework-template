const { Contact } = require("../db/collections");

async function getContacts() {
  const contacts = await Contact.find({});
  return contacts;
}

const getContactById = async (contactId) => {
  const contactById = await Contact.findById({ _id: contactId });
  return contactById;
};

async function removeContact(contactId) {
  const deletedContact = await Contact.deleteOne({ _id: contactId });
  return deletedContact;
}

async function addContact({ name, email, phone, favorite }) {
  const newContact = await new Contact({ name, email, phone, favorite });
  await newContact.save();
  return newContact;
}

const updateContact = async (contactId, { name, email, phone, favorite }) => {
  const contactsUpdate = await Contact.updateOne(
    { _id: contactId },
    { name, email, phone, favorite },
    { new: true }
  );
  return contactsUpdate;
};

const updateStatusContact = async (contactId, {favorite }) => {
  const contactsUpdate = await Contact.findByIdAndUpdate(
    { _id: contactId },
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
