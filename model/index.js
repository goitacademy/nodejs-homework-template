const fs = require("fs/promises");
const { object } = require("joi");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const shortid = require("shortid");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    return console.log("Error:", err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id.toString() === contactId);

    if (!contactById) {
      return console.log(`Contact with id: ${contactById} is not found`);
    }

    return contactById;
  } catch (err) {
    return console.log("Error:", err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      ({ id }) => id.toString() !== contactId
    );

    if (contacts.length === filteredContacts.length) {
      return console.log(`Contact with id: ${contactId} is not found`);
    }

    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf-8"
    );
    return filteredContacts;
  } catch (err) {
    return console.log("Error:", err.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: shortid.generate(), ...body };
    const contactList = [...contacts, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactList, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (err) {
    return console.log("Error:", err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id.toString() === contactId);
    const updatedContact = { ...contact, ...body };
    const updatedContactList = contacts.map(({ object }) =>
      object.id.toString() === contact.id ? updatedContact : object
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactList, null, 2),
      "utf-8"
    );
    return updatedContactList;
  } catch (err) {
    return console.log("Error:", err.message);
  }
};

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts()
//     const data = contacts.map(
//       ({ id }) => id.toString() === contactId
//       )
//      ? {...contact, ...body}
//      : contact

//     const updateContact = data.find(
//       ({ id }) => id.toString() === contactId
//       )

//     if(updateContact) {
//       await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8')
//     }
//     return false
//   } catch(err) {
//     return console.log("Error:", err.message)
//   }
// };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
