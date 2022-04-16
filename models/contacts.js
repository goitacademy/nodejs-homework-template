const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const list = JSON.parse(data);
  return list;
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const result = list.filter(
    (item) => parseInt(item.id) === parseInt(contactId)
  );
  return result;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const idx = list.findIndex(
    (item) => parseInt(item.id) === parseInt(contactId)
  );
  if (idx === -1) {
    return null;
  }
  const [removeContact] = list.splice(idx, 1);
  await fs.writeFile(filePath, JSON.stringify(list));
  return removeContact;
};

const addContact = async (body) => {
  const list = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(list));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const { name, email, phone } = body;
  let updContact = null;
  list.forEach((item) => {
    if (item.id === contactId) {
      item.name = name;
      item.email = email;
      item.phone = phone;
      updContact = item;
    }
  });
  await fs.writeFile(filePath, JSON.stringify(list));
  return updContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
