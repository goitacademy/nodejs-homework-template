const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");
const { joiShema } = require("../models/contact");
const { Contact } = require("./contact");

const listContacts = async () => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const conacts = await listContacts();
  const removeId = conacts.findIndex((item) => item.id === contactId);
  if (removeId === -1) {
    return null;
  }
  const [removeContact] = conacts.splice(removeId, 1);
  await fs.writeFile(contactsPath, JSON.stringify(conacts));
  return removeContact;
};

const addContact = async ({ name, email, phone }) => {
  const data = { name, email, phone };
  const conacts = await listContacts();
  const validation = joiShema(data);
  if (!validation.error) {
    const newContact = { id: nanoid(3).toString(), ...data };
    conacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(conacts));
    return newContact;
  }
  return null;
};

const updateContact = async (contactId, body) => {
  const conacts = await listContacts();
  const { name, email, phone } = body;
  const validation = joiShema(body);
  if (!validation.error) {
    conacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(conacts));
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
