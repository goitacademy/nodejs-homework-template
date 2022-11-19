const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = addContact;
