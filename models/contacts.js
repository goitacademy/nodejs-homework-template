const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data;
};

const getContactById = async (id) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data.find((contact) => contact.id === id);
};

const removeContact = async (id, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const result = data.filter((contact) => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

const addContact = async (body, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const id = nanoid();
    const newContact = { id, ...body };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return newContact;
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

const updateContact = async (id, body, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const index = data.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return false;
    }
    data.splice(index, 1, { id: id, ...body });
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return data[index];
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
