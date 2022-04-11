const fs = require("fs/promises");
const contactsPath = "./models/contacts.json";

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  console.table(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  const contact = contacts.find(
    (contact) => Number(contact.id) === Number(contactId)
  );
  console.table(contact);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  const isInContacts = () =>
    contacts.find((contact) => Number(contact.id) === Number(contactId));
  if (!isInContacts()) return "Not found";
  await fs.writeFile(
    contactsPath,
    JSON.stringify(
      contacts?.filter((contact) => Number(contact.id) !== Number(contactId))
    )
  );
  return "contact deleted";
};

const addContact = async ({ name, email, phone }) => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  const newContact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };
  fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
  console.table(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  let updated;
  const isInContacts = () =>
    contacts.find((contact) => Number(contact.id) === Number(contactId));
  if (!isInContacts()) return "Not found";
  fs.writeFile(
    contactsPath,
    JSON.stringify(
      contacts.map((contact) => {
        if (contact.id === contactId) {
          updated = { ...contact, ...body };
          return updated;
        }
        return contact;
      })
    )
  );
  return updated;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
