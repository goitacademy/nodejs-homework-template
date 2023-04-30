const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "/contacts.json");

const updateFile = async (data) =>
  await fs.writeFile(filePath, JSON.stringify(data), "utf-8");

const getContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (err) {
    console.error(err);
  }
};

const postContact = async (body) => {
  try {
    const contacts = await getContacts();
    contacts.push(body);
    await updateFile(contacts);
    return body;
  } catch (err) {
    console.error(err);
  }
};

const deleteContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await updateFile(updatedContacts);
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const changeContact = async (contactId, body) => {
  try {
    const contacts = await getContacts();
    const i = contacts.findIndex((contact) => contact.id === contactId);
    if (i === -1) {
      return null;
    }
    contacts[i] = { ...contacts[i], ...body };

    await updateFile(contacts);
    return contacts[i];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  changeContact,
};
