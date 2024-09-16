import { Contact } from "./postModel.js";

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const removedContacts = Contact.findByIdAndDelete(contactId);
  return removedContacts;
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;
  const contact = new Contact({ name, email, phone, favorite });
  return contact.save();
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contact = await Contact.findByIdAndUpdate(contactId, {
    name,
    email,
    phone,
  });
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });
  return contact;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
