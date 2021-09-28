const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname + "/contacts.json");
const listContacts = async () => {
  let contacts = await fs
    .readFile(contactsPath)
    .catch(() => console.log("smth went wrong..."));
  contacts = JSON.parse(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  let contacts = await fs
    .readFile(contactsPath)
    .catch(() => console.log("smth went wrong..."));
  contacts = JSON.parse(contacts);

  const targetContact = await contacts.find(
    (contact) => contact.id === Number(contactId)
  );

  return targetContact;
};

const removeContact = async (contactId) => {
  let contacts = await fs
    .readFile(contactsPath)
    .catch(() => console.log("smth went wrong..."));
  contacts = JSON.parse(contacts);

  const target = await contacts.find(
    (contact) => contact.id === Number(contactId)
  );

  if (!target) {
    return false;
  } else {
    const newContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return { message: "contact deleted" };
  }
};

const addContact = async (body) => {
  let contacts = await fs
    .readFile(contactsPath)
    .catch(() => console.log("smth went wrong..."));
  contacts = JSON.parse(contacts);
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  let contacts = await fs
    .readFile(contactsPath)
    .catch(() => console.log("smth went wrong..."));
  contacts = JSON.parse(contacts);
  contacts = contacts.map((contact) =>
    contact.id === Number(contactId) ? { ...contact, ...body } : contact
  );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  const newContacts = await fs.readFile(contactsPath);
  const target = JSON.parse(newContacts).find(
    ({ id }) => id === Number(contactId)
  );
  return target;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
