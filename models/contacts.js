const fs = require("fs/promises");

const listContacts = async () => {
  const list = await fs.readFile("models/contacts.json", "utf8");
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const list = await listContacts();

  return list.find((item) => item.id === contactId);
};

const removeContact = async (contactId) => {
  const list = await listContacts();

  const removeList = JSON.stringify(list.filter((x) => x.id !== contactId));

  if (list.length !== removeList.length) {
    const newList = await fs.writeFile("models/contacts.json", removeList);
    // await writeContacts(removeList);
    return true;
  }
  return false;
};

const addContact = async (body) => {
  const list = await listContacts();
  const id = (+list[list.length - 1].id + 1).toString();
  const writeContacts = fs
    .readFile("models/contacts.json", "utf8")
    .then((list) => {
      const listContact = JSON.parse(list);
      const newContact = JSON.stringify([...listContact, { id, ...body }]);
      fs.writeFile("models/contacts.json", newContact);
    });
  // await writeContacts([...list, { id, ...body }]);
  return { id, ...body };
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const index = list.findIndex((x) => x.id === contactId);
  if (index === -1) return null;
  list[index] = { ...list[index], ...body };
  const updatelist = JSON.stringify(list);
  fs.writeFile("models/contacts.json", updatelist);
  //
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
