const { Contact } = require('../db/contactModel');

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async contactId => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};

const changeContactById = async ({
  contactId,
  name,
  email,
  phone,
  favorite,
}) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });
};

const removeContactById = async contactId => {
  await Contact.findByIdAndRemove(contactId);
};

const updateStatusContact = async (
  contactId,
  { name, email, phone, favorite }
) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  removeContactById,
  updateStatusContact,
};
