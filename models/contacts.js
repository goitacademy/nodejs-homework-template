const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.normalize("db/contacts.json");

const listContacts = async () =>
  JSON.parse(await fs.readFile(contactsPath, "utf8"));

const getContactById = async (id) => {
  const contacts = await listContacts();
  const normID = id.toString();
  const index = contacts.findIndex((item) => item.id.toString() === normID);
  if (index === -1) {
    return { message: "Not found" };
  }
  return { status: "success", data: contacts[index] };
};
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id.toString() === id.toString()
  );
  if (index === -1) {
    return { message: "Not found" };
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return { message: "contact deleted" };
};
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  console.log(id, name, email, phone);
  contacts.forEach((item) => {
    if (item.id.toString() === id.toString()) {
      if (name) {
        item.name = name;
      }
      if (email) {
        item.email = email;
      }
      if (phone) {
        item.phone = phone;
      }
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return (await getContactById(id)) || { message: "missing fields" };
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
