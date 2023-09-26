const fs = require("fs/promises");
const path = require("path");
const jsonPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(jsonPath, { encoding: "utf8" });
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error("Error al leer o parsear el archivo JSON:", error);
  }
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const findContact = contactsList.find(
    (contact) => contact.id === contactId
  ) || { message: "contact no found" };
  return findContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const newList = contactsList.filter((contact) => contact.id !== contactId);
  if (contactsList.length !== newList.length) {
    const newListJson = JSON.stringify(newList, null, 2);
    await fs.writeFile(jsonPath, newListJson, "utf-8");
    return true;
  }
  return false;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContactsList = JSON.stringify([...contactsList, body], null, 2);
  await fs.writeFile(jsonPath, newContactsList, "utf-8");
  return body;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contactsList = await listContacts();
  const validated = contactsList.some((contact) => contact.id === contactId);

  if (validated) {
    const newContactsList = JSON.stringify(
      contactsList.map((contact) => {
        if (contact.id === contactId) {
          return { ...contact, name: name, email: email, phone: phone };
        }
        return contact;
      }),
      null,
      2
    );
    await fs.writeFile(jsonPath, newContactsList, "utf-8");

    return true;
  }

  return false;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
