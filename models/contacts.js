const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const ObjectID = require("bson-objectid");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    return await JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = await contacts.find((item) => item.id === contactId);
  if (!result) return null;
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;
  const [result] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: ObjectID(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();

    const indexOfDeleteContact = [...data].reduce((acc, contact, index) => {
      if (contact.id === contactId) {
        acc = index;
      }
      return acc;
    }, -1);

    if (indexOfDeleteContact !== -1) {
      data.splice(indexOfDeleteContact, 1, {
        ...data[indexOfDeleteContact],
        ...body,
      });

      const normalizedContacts = JSON.stringify(data);
      await fs.writeFile(contactsPath, normalizedContacts, null, 2, "utf8");

      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
