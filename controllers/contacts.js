const fs = require("fs").promises;

const path = require("path");
const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
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
    const addData = [
      ...dataParse,
      {
        id: `${contactIndex}`,
        name,
        email,
        phone,
      },
    ];
    await fs.writeFile(contactsPath, JSON.stringify(addData));

    return data;
  } catch (err) {
    return err;
  }
};

const updateContact = async (id, newContact) => {
  const data = await fs.readFile(contactsPath);
  const dataParse = JSON.parse(data);

  let found = false;
  for (let i = 0; i < dataParse.length; i++) {
    if (dataParse[i].id === id) {
      dataParse[i] = { id: id, ...newContact };
      found = true;
      break;
    }
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
