const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    const [deleteContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    return deleteContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const NewContact = { ...name, ...email, ...phone, id: v4() };
    contacts.push(NewContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    return NewContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (id, body) => {
  // const { name, email, phone } = body;
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  // if (contacts[idx].id === id) {
  //   if (name) {
  //     contacts[idx].name = name;
  //   }
  //   if (email) {
  //     contacts[idx].email = email;
  //   }
  //   if (phone) {
  //     contacts[idx].phone = phone;
  //   }
  // }
  contacts[idx] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
