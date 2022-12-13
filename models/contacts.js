const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const list = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));
  return list;
}

async function getContactById(contactId) {
  const contact = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => data.find((el) => el.id === contactId))

    .catch((err) => console.log(err.message));

  // if (!contact) {
  //   return "There is no requested id";
  // }
  return contact;
}

async function removeContact(contactId) {
  const contact = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      if (data.find((el) => el.id === contactId)) {
        return data.filter((el) => el.id !== contactId);
      }
      return null;
    })
    .catch((err) => console.log(err.message));

  if (!contact) {
    return "There is no requested id";
  }
  await updateContacts(contact);
  return contact;
}

async function addContact({ name, email, phone }) {
  const contacts = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));

  const newContact = { name, email, phone, id: nanoid() };
  console.log(newContact);

  contacts.push(newContact);
  await updateContacts(contacts);
  return contacts;
}

async function updateContact(contactId, body) {
  const contact = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contact[index] = { ...body, id: contactId };
  await updateContacts(contact);
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// delete