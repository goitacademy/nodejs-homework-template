const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const result = JSON.parse(data);

  const contact = result.find((el) => el.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const contact = data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contact));
  return data;
};

const addContact = async (body) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  data.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(data));
};

const updateContact = async (contactId, body) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  if (data.find((el) => el.id === contactId)) {
    const [newContact] = data.filter((el) => el.id === contactId);
    newContact.name = body.name;
    newContact.email = body.email;
    newContact.phone = body.phone;
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } else {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
