const getAll = require("./listContacts");
const updateContacts = require("./updateContacts");

const updateContact = async (id, body) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (
    idx === -1
    //   || JSON.stringify(contacts[idx]) === JSON.stringify({ id, ...body })
  ) {
    return null;
  }

  contacts[idx] = { id, ...body };

  await updateContacts(contacts);

  return contacts[idx];
};

module.exports = updateContact;
