const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const newData = JSON.parse(data);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  const data = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      return JSON.parse(data).filter(
        (contact) => contact.id === contactId.toString()
      );
    })
    .catch((error) => console.error(error));

  return data;
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);

    const newData = JSON.stringify(
      JSON.parse(data).filter((contact) => contact.id !== contactId.toString())
    );
    await fs.writeFile(contactsPath, newData, "utf-8");

    return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const newData = JSON.parse(data);
    const id = uuidv4();
    const newContact = [...newData, { id, name, email, phone }];
    fs.writeFile(contactsPath, JSON.stringify(newContact));
    return newContact;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf-8");

  const newData = JSON.parse(data);
  const contacts = newData.map((contact) => {
    if (contact.id === contactId.toString()) {
      return {
        id: contact.id,
        name: body.name || contact.name,
        email: body.email || contact.email,
        phone: body.phone || contact.phone,
      };
    } else {
      return contact;
    }
  });
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
