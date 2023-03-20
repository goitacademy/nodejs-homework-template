const fs = require("fs/promises");

const listContacts = async () => {
  const response = await fs.readFile("./controllers/contacts.json");
  return JSON.parse(response.toString());
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const findIndex = list.find((el) => el.id.toString() === contactId.toString());

  return findIndex;
};

const removeContact = async (contactId) => {
  const list = await listContacts(contactId);
  const findIndex = list.find((el) => el.id.toString() === contactId);
  list.splice(findIndex, 1);

  if (findIndex === -1) {
    return JSON.parse(list);
  }

  await fs.writeFilte("./contacts.json", JSON.stringify(list));
};

const addContact = async (body) => {
  const list = await listContacts();
  const newList = { id: list.length + 1, ...body };
  list.push(newList);

  await fs.writeFilte("./contacts.json", JSON.stringify(list));

  return newList;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const findIndex = list.find((el) => el.id === contactId);

  if (findIndex === -1) {
    return null;
  };

  list[findIndex] = { ...list[findIndex], ...body };

  await fs.writeFilte("./contacts.json", JSON.stringify(list));

  return list[findIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};