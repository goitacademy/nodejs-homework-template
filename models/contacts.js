const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const newData = JSON.parse(data);
  return newData;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const newData = JSON.parse(data);
  return newData.filter((el) => el.id === String(contactId));
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const newData = JSON.parse(data);
    const booleanContacts = newData.some((el) => el.id === String(contactId));
    const newContacts = newData.filter((el) => el.id !== String(contactId));
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return booleanContacts;
  } catch (error) {
    return { message: error.message };
  }
};

const addContact = async ({ name, email, phone }) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const user = JSON.parse(data);
  const id = uuidv4();
  const newData = [...user, { id, name, email, phone }];
  fs.writeFile(contactsPath, JSON.stringify(newData));
  return newData.filter((el) => el.id === id);
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const user = JSON.parse(data);
  const userContacts = user.map((el) => {
    if (el.id === String(contactId)) {
      return {
        id: el.id,
        name: body.name,
        email: body.email,
        phone: body.phone,
      };
    } else {
      return el;
    }
  });

  fs.writeFile(contactsPath, JSON.stringify(userContacts));
  return userContacts.filter((el) => el.id === String(contactId));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
