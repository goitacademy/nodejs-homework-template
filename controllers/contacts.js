
const { Contact } = require("../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (_id) => {
  const contact = await Contact.findOne({_id});
  return contact;
};

const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (error) {
    console.log(error);
}
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (_id, newContact) => {
  const updateContact = await Contact.findByIdAndUpdate(_id, newContact);
  if (!updateContact) {
    return null
  }
  return updateContact;
};

const updateStatus = async (_id, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
=======
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "contacts.json");

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // Plik nie istnieje, zwróć pustą tablicę
      return [];
    }
    throw error;
  }
};

const writeContactsFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  return await readContactsFile();
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1)[0];
  await writeContactsFile(contacts);
  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const contactId =
    contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
  const newContact = { id: contactId, ...body };
  contacts.push(newContact);
  await writeContactsFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await writeContactsFile(contacts);
  return contacts[index];

};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,

  updateStatus,
};

};

