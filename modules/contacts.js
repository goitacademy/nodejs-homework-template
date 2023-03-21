const path = require("node:path");
const fs = require("fs/promises");
const shortid = require("shortid");
// const { json } = require("express");

const contactsPath = path.join(__dirname, "./contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contId = data.find((el) => el.id === String(contactId));
    if (!contId) {
      return null;
    }
    return contId;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newContArray = data.filter((el) => el.id !== String(contactId));
    if (data.length === newContArray.length) {
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContArray, null, "\t"));
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await listContacts();
    const newCont = { name, email, phone, id: shortid.generate() };
    data.push(newCont);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, "\t"));
    return newCont;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const index = data.findIndex(
      (el) => el.id.toString() === contactId.toString()
    );
    if (index === -1) {
      return null;
    }
    data[index] = {
      ...data[index],
      ...body,
    };

    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
