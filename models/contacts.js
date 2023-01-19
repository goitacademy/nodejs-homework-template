const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    return contList;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const contId = contList.find((cont) => cont.id === contactId);
    return contId;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const indexRemoveId = contList.findIndex((cont) => cont.id === contactId);
    if (indexRemoveId !== -1) {
      const deleteContact = contList[indexRemoveId];
      contList.splice(indexRemoveId, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contList), "utf8");
      return deleteContact;
    } else {
      console.log("ID not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const maxId = Math.max(...contList.map((cont) => Number(cont.id)));
    const newContact = {
      id: String(maxId + 1),
      name,
      email,
      phone,
    };
    contList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contList), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    // const { name, email, phone } = body;
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const updateId = contList.find((cont) => cont.id === contactId);
    const { name, email, phone } = body;
    const indexUpdateId = contList.findIndex((cont) => cont.id === contactId);
    if (updateId) {
      contList.splice(indexUpdateId, 1);
      const newUpdateContact = {
        id: updateId.id,
        name,
        email,
        phone,
      };
      contList.push(newUpdateContact);
      await fs.writeFile(contactsPath, JSON.stringify(contList), "utf8");
      return newUpdateContact;
    } else {
      return updateId;
    }
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
