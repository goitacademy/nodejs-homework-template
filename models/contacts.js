const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const pathList = path.resolve("./models/contacts.json");

const listContacts = async () =>
  fs.readFile(pathList, "utf8", (err, data) => {
    if (err) {
      return err;
    } else {
      return data;
    }
  });

const getContactById = async (contactId) => {
  const list = JSON.parse(await listContacts());
  let contactCandidate = null;
  list.forEach((el) => {
    if (el.id === contactId) {
      contactCandidate = { ...el };
    }
  });
  return contactCandidate;
};

const removeContact = async (contactId) => {
  const list = JSON.parse(await listContacts());
  let candidateInList = false;
  const updatedList = list.find((contact) => {
    if (contact.id !== contactId) {
      return contact;
    } else {
      candidateInList = true;
      return null;
    }
  });
  await fs.writeFile(pathList, JSON.stringify(updatedList), "utf8");

  return candidateInList;
};

const addContact = async (body) => {
  const newContact = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const list = JSON.parse(await listContacts());
  const updatedList = [...list, newContact];

  await fs.writeFile(pathList, JSON.stringify(updatedList), "utf8");

  return newContact;
};

const updateContact = async (contactId, body) => {
  const list = JSON.parse(await listContacts());
  let updatedItem = null;
  const updatedList = list.map((contact) => {
    if (contact.id === contactId) {
      contact = {
        ...contact,
        ...body,
      };
      updatedItem = { ...contact };
    }
    return contact;
  });
  await fs.writeFile(pathList, JSON.stringify(updatedList), "utf8");

  return updatedItem;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
