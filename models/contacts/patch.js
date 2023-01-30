const fs = require("fs/promises");
const contactDdbPath = require("./dbPath");
const get = require("./get");

async function patch(contactId, { name, email, phone }) {
  const contacts = await get();

  const updatedContact = contacts.forEach((contact) => {
    if (contact.id === contactId) {
      if (name) {
        contact.name = name;
      }
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
      return contact;
    }
  });

  await fs.writeFile(contactDdbPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = patch;
