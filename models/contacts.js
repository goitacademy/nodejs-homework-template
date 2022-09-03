const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.resolve("./models/contacts.json");

const getContactsList = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};

const listContacts = async (request, response) => {
  console.log("work");
  const contacts = await getContactsList();
  response.status(200).json(contacts);
};

const getContactById = async (request, response) => {
  const { contactId } = request.params;
  const contacts = await getContactsList();
  const contactById = contacts.find((contact) => contact.id === contactId);

  if (!contactById) {
    return response.status(404).json({ message: "Not found" });
  }

  response.status(200).json(contactById);
};

const removeContact = async (request, response) => {
  const { contactId } = request.params;
  const contacts = await getContactsList();
  const contactsListAfterRemove = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(contactsListAfterRemove));

  const isDeleteSuccess = contacts.length > contactsListAfterRemove.length;
  if (isDeleteSuccess) {
    response.status(200).json({ message: "contact deleted" });
  } else {
    response.status(404).json({ message: "Not found" });
  }
};

const addContact = async (request, response) => {
  const newContactBody = request.body;
  const contacts = await getContactsList();
  const newId = parseInt(contacts[contacts.length - 1].id) + 1;
  const newContact = {
    id: `${newId}`,
    ...newContactBody,
  };
  const newContactsList = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  response.status(201).json(newContact);
};

const updateContact = async (request, response) => {
  const newContactBody = request.body;
  if (Object.keys(newContactBody).length === 0) {
    return response.status(400).json({ message: "missing fields" });
  }
  const { contactId } = request.params;
  const contacts = await getContactsList();
  let updatedContact = {};
  const updatedContactsList = contacts.map((contact) => {
    if (contact.id === contactId) {
      updatedContact = { ...contact, ...newContactBody };
      return updatedContact;
    }
    return contact;
  });

  if (updatedContact?.id !== contactId) {
    return response.status(404).json({ message: "Not found" });
  }

  await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  response.status(200).json(updatedContact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
