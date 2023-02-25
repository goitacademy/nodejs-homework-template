const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "data", "contacts.json");
const getContacts = require("./getContacts");

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await getContacts();

  const [contact] = contacts.filter((el) => el.id === id);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

  return contact;
};

module.exports = updateContact;
