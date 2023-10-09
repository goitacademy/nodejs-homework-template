const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactInfo = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const listContacts = async () => {
  try {
    const contacts = await getAll();
    return contacts;
  } catch (error) {
    console.error("Get List method is incomplete", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  const contacts = await getAll();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index >= 0) {
    const [deletedContact] = contacts.splice(index, 1);
    await updateContactInfo(contacts);
    return deletedContact;
  }
  return null;
};

const addContact = async (name, email, phone) => {
  const contacts = await getAll();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContactInfo(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      console.log("Contact not found");
      return null;
    }

    if (!body.name || !body.email || !body.phone) {
      return { message: "Missing fields" };
    }

    allContacts[index].name = body.name;
    allContacts[index].email = body.email;
    allContacts[index].phone = body.phone;

    await updateContactInfo(allContacts);

    return allContacts[index];
  } catch (error) {
    console.error("Error updating contact", error);
    throw error;
  }
};

module.exports = {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
};
