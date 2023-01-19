const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "data", "contacts.json");
const getContacts = require("./getContacts");

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await getContacts();

  contacts.forEach((contact) => {
    if (contact.id === id) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

  const [result] = contacts.filter((contact) => contact.id === id);
  return result;
};

module.exports = updateContact;
