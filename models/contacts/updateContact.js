const listContacts = require("./listContacts");
const fs = require("fs").promises;
const path = require("path");
const contactPath = path.resolve("./models/contacts.json");

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    contacts[contactIndex].name = name;
    contacts[contactIndex].email = email;
    contacts[contactIndex].phone = phone;
    await fs.writeFile(contactPath, JSON.stringify(contacts));
    return contacts[contactIndex];
  } else {
    return null;
  }
};

module.exports = updateContact;
