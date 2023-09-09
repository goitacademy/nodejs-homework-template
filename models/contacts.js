const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const listContacts = async () => {
  const data = await fs.readFile("./contacts.json", "utf-8");
  return JSON.parse(data);
};

const ERROR_MESSAGES = {
  CONTACT_ALREADY_EXISTS: "The contact already exists",
  MISSING_PARAMETERS: "Missing required parameters: name, email, phone",
};
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error("Contact not found");
  } else {
    return contact;
  }
};

const removeContact = async (contactId) => {
  let contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    throw new Error("Contact not found");
  } else {
    // Elimina el contacto de la lista
    const removedContact = contacts.splice(contactIndex, 1)[0];

    // Sobrescribe el archivo JSON con la lista actualizada
    await fs.writeFile("./contacts.json", JSON.stringify(contacts), "utf-8");
    return removedContact;
  }
};

const addContact = async (name, email, phone) => {
  let contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.email === email);

  if (contactIndex !== -1) {
    throw new Error(ERROR_MESSAGES.CONTACT_ALREADY_EXISTS);
  }

  if (!name || !email || !phone) {
    throw new Error(ERROR_MESSAGES.MISSING_PARAMETERS);
  }

  const id = uuidv4();
  contacts.push({ id, name, email, phone });
  await fs.writeFile("./contacts.json", JSON.stringify(contacts), "utf-8");
  return { id, name, email, phone };
};

const updateContact = async (contactId, name, email, phone) => {
  let contacts = await listContacts();

  const contacFind = contacts.findIndex((contact) => contact.id === contactId);
  

  if (contacFind === -1) {
    throw new Error("Contact not found");
  } else {
    const updatedContact = contacts[contacFind];
    console.log(updatedContact);
    if (name) {
      updatedContact.name = name;
    }
    if (email) {
      updatedContact.email = email;
    }
    if (phone) {
      updatedContact.phone = phone;
    }
    await fs.writeFile("./contacts.json", JSON.stringify(contacts), "utf-8");

    // Sobrescribe el archivo JSON con la lista actualizada

    return updatedContact;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  ERROR_MESSAGES,
  updateContact,
};
