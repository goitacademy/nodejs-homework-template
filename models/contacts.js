const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);

    const oneContact = parsedData.find((e) => e.id === `${contactId}`);

    if (!oneContact) {
      return null;
    }
    return oneContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    let newContacts = [];
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = await JSON.parse(data);

    parsedData.map((contact) => {
      if (contact.id !== contactId) {
        newContacts = [...newContacts, contact];
      }
      return newContacts;
    });

    if (data.length === newContacts.length) {
      return null;
    }

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");

    const removedContacts = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(removedContacts);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = [...parsedData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(allContacts), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  let updatedContact = {};

  parsedData.forEach((item) => {
    if (item.id === contactId) {
      item.name = body.name;
      item.email = body.email;
      item.phone = body.phone;
      updatedContact = { ...item };
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf8");
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
