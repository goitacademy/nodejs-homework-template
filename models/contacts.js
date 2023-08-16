const Contact = require('./Contact'); 

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error('Error listing contacts:', error);
    throw new Error('Internal Server Error');
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    throw new Error('Internal Server Error');
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw new Error('Internal Server Error');
  }
};

const updateContact = async (contactId, name, email, phone) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true }
    );
    return contact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw new Error('Internal Server Error');
  }
};

const updateContactStatus = async (contactId, favorite) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return contact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw new Error('Internal Server Error');
  }
};



const removeContact = async (contactId) => {
  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);
    return removedContact;
  } catch (error) {
    console.error('Error removing contact:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  removeContact,
};


// const fs = require("fs/promises");
// const path = require("path");
// const crypto = require("crypto");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const contactsBuffer = await fs.readFile(contactsPath);

//   return JSON.parse(contactsBuffer) || [];
// };

// const generateUniqueId = () => {
//   return crypto.randomBytes(8).toString("hex");
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();

//   return contacts.find(({ id }) => id === contactId) || null;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = { id: generateUniqueId(), name, email, phone };

//   contacts.push(newContact);

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return newContact;
// };

// const updateContact = async (
//   contactId,
//   name = null,
//   email = null,
//   phone = null
// ) => {
//   const contacts = await listContacts();

//   const contactIndex = contacts.findIndex(({ id }) => id === contactId);

//   if (contactIndex === -1) {
//     return null;
//   }

//   const contact = contacts[contactIndex];

//   const updatedContact = {
//     ...contact,
//     name: name ?? contact.name,
//     email: email ?? contact.email,
//     phone: phone ?? contact.phone,
//   };

//   contacts[contactIndex] = updatedContact;

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return updatedContact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();

//   const contactIndex = contacts.findIndex(({ id }) => id === contactId);

//   if (contactIndex === -1) {
//     return null;
//   }

//   const contact = contacts[contactIndex];

//   contacts.splice(contactIndex, 1);

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return contact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   updateContact,
//   removeContact,
// };