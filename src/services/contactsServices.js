const { Contact } = require("../db/contactModel");

const getContacts = async (owner, { page, perPage }) => {
  const skip = (page - 1) * perPage;
  const contacts = await Contact.find({ owner }, { __v: 0 })
    .skip(skip)
    .limit(perPage)
    .sort({ favorite: -1 });
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contact({ name, email, phone, favorite, owner });
  await contact.save();
};

const changeContactById = async ({
  contactId,
  name,
  email,
  phone,
  favorite,
}) => {
  await Contact.findByIdAndUpdate(contactId, { name, email, phone, favorite });
};

const removeContactById = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const updateStatusContact = async (
  contactId,
  { name, email, phone, favorite }
) => {
  await Contact.findByIdAndUpdate(contactId, { name, email, phone, favorite });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  removeContactById,
  updateStatusContact,
};
