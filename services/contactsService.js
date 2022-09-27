const { Contact } = require('../db/contacts');

const getContacts = async () => await Contact.find({});

const getContactById = async contactId => await Contact.find({ _id: contactId });

const addContact = async body => {
  const contact = new Contact({ ...body });
  await contact.save();
  return contact;
};

const deleteContact = async contactId => await Contact.findByIdAndDelete(contactId);

const updateContactById = async (contactId, body) =>
  await Contact.findByIdAndUpdate(contactId, { ...body }, { returnDocument: 'after' });

module.exports = { getContacts, getContactById, addContact, deleteContact, updateContactById };
