const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");
// const contactPath = path.resolve("../models/contacts.json");

// const readContacts = async () => {
//   const contactsRaw = await fs.readFile(contactsPath, "utf8");
//   const contacts = JSON.parse(contactsRaw);
//   return contacts;
// };

// const writeContacts = async (contacts) => {
//   return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

// const listContacts = async () => {
//   const contacts = await readContacts();
//   return contacts;
// };

const listContacts = async () => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data;
};

// const getContactById = async (contactId, res) => {
//   const contacts = await readContacts();
//   const contactById = contacts.find((contact) => contact.id == contactId);
//   return contactById;
// };

const getContactById = async (contactId) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data.find((contact) => contact.id === contactId);
};

// const removeContact = async (contactId) => {
//   const contacts = await readContacts();
//   const result = contacts.filter((contact) => contact.id !== contactId);
//   if (contacts.length === result) {
//     return false;
//   }
//   await writeContacts(result);
//   return true;
// };

const removeContact = async (contactId, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const result = data.filter((contact) => contact.id !== contactId);
    // if (data.length === result) {
    //   return false;
    // }
    await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
    // return true;
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

// const addContact = async (body) => {
//   const id = nanoid();
//   // const { name, email, phone } = body;
//   const contacts = await readContacts();
//   const newContact = { id, ...body };
//   contacts.push(newContact);
//   await writeContacts(contacts);
//   return newContact;
// };

const addContact = async (body, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const id = nanoid();
    const newContact = { id, ...body };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return newContact;
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

// const updateContact = async (contactId, body, res) => {
//   // const { name, email, phone } = body;
//   const contacts = await readContacts();
//   const updateContacts = contacts.find((contact) => contact.id === contactId);
//   await writeContacts(updateContacts, body);
// };

const updateContact = async (contactId, body, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const index = data.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return false;
    }
    data.splice(index, 1, { id: contactId, ...body });
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return data[index];
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
