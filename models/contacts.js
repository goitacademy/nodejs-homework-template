const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const [contact] = data.filter((el) => el.id === contactId.toString());
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  let data = await listContacts();

  const contactsId = data.map((el) => el.id);
  if (!contactsId.includes(contactId)) {
    return;
  }

  const newContacts = data.filter((el) => el.id !== contactId);

  data = [...newContacts];
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf8");
  return data;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();

  const id = Math.max(...data.map((contact) => Number(contact.id))) + 1;
  const newContact = {
    id: id.toString(),
    name,
    email,
    phone,
  };
  const contactsName = data.map((el) => el.name);
  if (contactsName.includes(newContact.name)) {
    return;
  }
  const newContacts = [...data, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    "utf8"
  );
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  data.forEach((el) => {
    if (el.id === contactId) {
      el.name = name;
      el.email = email;
      el.phone = phone;
    }
  });

  const [updatedContact] = data.filter((el) => el.id === contactId);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf8");
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
