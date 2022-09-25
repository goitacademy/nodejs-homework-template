const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("models/contacts.json");

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
    const dataArray = JSON.parse(data);
    return dataArray.find(
      (contact) => Number(contact.id) === Number(contactId)
    );
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    let newArray = [];
    const data = await fs.readFile(contactsPath, "utf8");
    const dataArray = JSON.parse(data);
    dataArray.map((contact) => {
      if (contact.id !== contactId) {
        newArray = [...newArray, contact];
      }
      return newArray;
    });
    if (dataArray.length === newArray.length) {
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(newArray), "utf8");
    const newData = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(newData);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const arrayData = JSON.parse(data);
    // const newId = Number(arrayData[arrayData.length - 1].id);
    const newContact = {
      // id: String(newId + 1),
      name,
      email,
      phone,
    };
    const newArray = [...arrayData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newArray), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};
const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const arrayData = JSON.parse(data);
  let updateItem = {};
  // eslint-disable-next-line array-callback-return
  arrayData.filter((item) => {
    if (item.id === contactId) {
      item.name = body.name;
      item.email = body.email;
      item.phone = body.phone;
      updateItem = { ...item };
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(arrayData), "utf8");
  return updateItem;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
