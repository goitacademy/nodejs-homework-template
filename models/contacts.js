const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contactById = data.find((el) => el.id === contactId);
    return contactById || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const index = data.findIndex((el) => el.id === contactId);

    if (index === -1) {
      return null;
    }

    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const data = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    data.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);

  if (index === -1) {
    return null;
  }

  data[index] = { contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
