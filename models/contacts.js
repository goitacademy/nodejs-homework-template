const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  try {
    const data = await fs.promises.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((el) => String(el.id) === String(contactId));
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const deleteContact = await getContactById(contactId);
  const newContacts = data.filter((el) => String(el.id) !== String(contactId));

  try {
    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, " ")
    );
  } catch (err) {
    console.log(`Write error: ${err}`);
  }
  return deleteContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await listContacts();
  const addedContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  data.push(addedContact);
  try {
    await fs.promises.writeFile(contactsPath, JSON.stringify(data, null, " "));
    return addedContact;
  } catch (err) {
    console.log(`Contact no add! Write error: ${err}`);
  }
};

const updateContact = async (id, body) => {
  const data = await listContacts();
  const index = data.findIndex((el) => String(el.id) === String(id));

  if (index === -1) {
    return null;
  }
  data[index] = { id, ...body };
  try {
    await fs.promises.writeFile(contactsPath, JSON.stringify(data, null, " "));
    return data[index];
  } catch (err) {
    console.log(`Contact no update! Write error: ${err}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
