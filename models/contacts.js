const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);
    return fileData;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const index = data.find((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    return index;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();

    const index = data.find((contact) => contact.id === contactId);

    if (index === undefined) {
      return null;
    }

    data.splice(index, 1);
    fs.writeFile("contacts.json", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const data = await listContacts();

    const newContact = {
      id: `${data.length + 1}`,
      name,
      email,
      phone,
    };
    if (newContact.name && newContact.email && newContact.phone) {
      data.push(newContact);
    }
    fs.writeFile("contacts.json", JSON.stringify(data.push(newContact)));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.find((contact) => contact.id === contactId);

  if (index === undefined) {
    return null;
  }

  data[index] = { contactId, ...body };
  fs.writeFile("contacts.json", JSON.stringify(data));
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
