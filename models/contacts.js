const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join("./models", "contacts.json");
const contactsData = require("./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParsed = JSON.parse(data.toString());
    const dataId = dataParsed.filter((el) => el.id === contactId);

    if (dataId.length > 0) {
      return dataId;
    }
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParsed = JSON.parse(data.toString());
    const contactIndex = dataParsed.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      contactsData.splice(contactIndex, 1);

      await fs.writeFile(contactsPath, JSON.stringify(contactsData), (err) => {
        if (err) {
          console.log(err.message);
        }
      });
      console.log("Contact removed!");
      return true;
    } else {
      console.log("This contact doesn't exist.");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (contact) => {
  const { name, email, phone } = contact;
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contactsData.push(newContact);

  const contactsDataUpd = JSON.stringify(contactsData);

  fs.writeFile(contactsPath, contactsDataUpd, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  console.log("Contact added!");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contactToBeUpdated = contacts.findIndex(
    (item) => item.id === contactId
  );
  if (contactToBeUpdated === -1) {
    return null;
  }
  contacts[contactToBeUpdated] = {
    ...contacts[contactToBeUpdated],
    ...body,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
