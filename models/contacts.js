const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    let bufferData = await fs.readFile(contactsPath);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    let bufferData = await fs.readFile(contactsPath);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    const contact = data.find((item) => item.id === contactId);
    return contact;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  let contacts;
  try {
    let bufferData = await fs.readFile(contactsPath);
    let stData = bufferData.toString();
    contacts = JSON.parse(stData);
  } catch (err) {
    console.log(err);
  }
  if (contacts.find(({ id }) => id === contactId) !== undefined) {
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
    let updatedData = JSON.stringify(filteredContacts);
    fs.writeFile(contactsPath, updatedData);
    return {
      status: 200,
      message: "contact deleted",
    };
  } else {
    return {
      status: 404,
      message: "Contact not found!",
    };
  }
};

const addContact = async (body) => {
  const contact = body;
  try {
    let bufferData = await fs.readFile(contactsPath);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    data.push(contact);

    let updatedData = JSON.stringify(data);

    fs.writeFile(contactsPath, updatedData);
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  let contacts;
  const { name, email, phone } = body;
  try {
    let bufferData = await fs.readFile(contactsPath);
    let stData = bufferData.toString();
    contacts = JSON.parse(stData);
  } catch (err) {
    console.log(err);
  }

  if (contacts.find(({ id }) => id === contactId) !== undefined) {
    let contact = contacts.find((item) => item.id === contactId);
    name !== undefined ? (contact.name = name) : contact.name;
    email !== undefined ? (contact.email = email) : contact.email;
    phone !== undefined ? (contact.phone = phone) : contact.phone;
    return {
      status: 201,
      data: contact,
      message: "Contact updated",
    };
  } else {
    return { status: 404, message: "Not found" };
  }
};

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
