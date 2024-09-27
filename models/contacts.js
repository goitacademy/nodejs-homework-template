const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("node:path");

const contactsPath = path.join(__dirname, "contacts.json");


const updateContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf8");
};

const listContacts = async () => {
    const contactsString = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(contactsString);
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    return index === -1 ? null : contacts[index];
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    if (contacts.findIndex((item) => item.id === contactId) === -1) {
      return null;
    } else {
      const filteredContacts = contacts.filter((item) => item.id !== contactId);
      await updateContacts(filteredContacts);
      return true;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async ({name, email, phone}) => {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index !== -1) {
      Object.entries(body).forEach(([key,value])=>{
        contacts[index][key]=value;
      })
      await updateContacts(contacts);
      return contacts[index];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
