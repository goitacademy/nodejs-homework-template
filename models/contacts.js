import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");
const updateContacts = (contact) =>
  fs.writeFile(contactsPath, JSON.stringify(contact, null, 1));

const listContacts = async () => {
  const dataContracts = await fs.readFile(contactsPath);
  return JSON.parse(dataContracts);
};
const getContactById = async (contactId) => {
  const dataContracts = await listContacts();
  const resultContact = dataContracts.find((item) => item.id === contactId);
  return resultContact || null;
};

const removeContact = async (contactId) => {
  const dataContracts = await listContacts();
  const contactIndex = dataContracts.findIndex(
    (dataContract) => dataContract.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [result] = dataContracts.splice(contactIndex, 1);
  await updateContacts(dataContracts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  try {
    const dataContracts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    dataContracts.push(newContact);
    await updateContacts(dataContracts);
    return newContact;
  } catch (error) {}
};

const updateContactById = async (contactId, body) => {
  const dataContracts = await listContacts();
  const contactIndex = dataContracts.findIndex(
    (dataContract) => dataContract.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  dataContracts[contactIndex] = { id: contactId, ...body };
  await updateContacts(dataContracts);
  return dataContracts[contactIndex];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
