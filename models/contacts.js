const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const contactSchema = require("../schemas/contact");

const listContacts = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  const contacts = await JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const result = contactList.find((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  let newList = await listContacts();

  const contactToRemove = newList.find((contact) => contact.id === contactId);

  if (contactToRemove) {
    newList = newList.filter((contact) => contact.id !== contactId);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(newList)
    );
    return contactId;
  } else {
    return { error: "ID not found" };
  }
};

const addContact = async (body) => {
  const response = contactSchema.validate(body, { abortEarly: false });

  if (response.error) {
    return {
      error: response.error,
    };
  }

  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };

  const newList = await listContacts();
  newList.push(newContact);
  fs.writeFile(path.join(__dirname, "contacts.json"), JSON.stringify(newList));

  return {
    error: null,
    newContact,
  };
};

const updateContact = async (contactId, body) => {
  let updatedContact = await getContactById(contactId);
  updatedData = {
    name: body?.name,
    email: body?.email,
    phone: body?.phone,
  };

  const response = contactSchema.validate(updatedData, {
    abortEarly: false,
  });

  if (response.error) {
    return {
      error: response.error,
    };
  }

  updatedContact = {
    ...updateContact,
    name: body?.name,
    email: body?.email,
    phone: body?.phone,
  };

  await removeContact(contactId);
  await addContact(updatedContact);
  return { updatedContact };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
