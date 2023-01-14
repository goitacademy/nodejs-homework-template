const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(
  "/Users/aleksandr/git_hub_projects/nodejs-homework-rest-api/models/contacts.json"
);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(rawData);
    const dataById = data.filter((el) => el.id === contactId);
    return dataById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  try {
    const { id, name, email, phone } = body;
    const rawData = await fs.readFile(contactsPath, "utf8");

    const data = JSON.parse(rawData);
    data.push({ id, name, email, phone });
    const dataToWrite = JSON.stringify(data, null, 2);

    fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
    return { id, name, email, phone };
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
