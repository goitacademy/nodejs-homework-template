const fs = require("fs").promises;

const path = require("path");
const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  return parseData.find((contact) => contact.id === id);
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const filterContacts = JSON.parse(data).filter(
      (data) => Number(data.id) !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
    return listContacts();
  } catch (err) {
    return err;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParse = JSON.parse(data);
    const contactIndex = Number(dataParse[dataParse.length - 1].id) + 1;
    const newContact = {
      id: `${contactIndex}`,
      name,
      email,
      phone,
    };
    const addData = [...dataParse, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(addData));

    return newContact;
  } catch (err) {
    return err;
  }
};

const updateContact = async (id, newContact) => {
  const data = await fs.readFile(contactsPath);
  const dataParse = JSON.parse(data);

  let found = false;

  const index = dataParse.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    dataParse[index] = { id: id, ...newContact };
    found = true;
  }

  if (!found) {
    const nextId = parseInt(dataParse[dataParse.length - 1].id) + 1;
    const newContactWithId = { id: nextId, ...newContact };
    dataParse.push(newContactWithId);
  }
  await fs.writeFile(contactsPath, JSON.stringify(dataParse));
  return dataParse.find((contact) => contact.id === id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
