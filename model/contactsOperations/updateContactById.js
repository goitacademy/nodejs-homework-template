const fs = require("fs/promises");

const contactsPath = require("./contactsPath");
const getAllContacts = require("./getAllContacts");

const updateContact = async (id, data) => {
  const contacts = await getAllContacts();

  const index = contacts.findIndex(
    (contact) => contact.id === Number(id) || contact.id === id
  );
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...data, id };

  const contsctsStr = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contsctsStr);
  return contacts[index];
};

module.exports = updateContact;
