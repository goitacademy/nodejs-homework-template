const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");
const Generator = require("id-generator");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const res = await JSON.parse(data);

    return res;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);

    const contact = result.find((evt) => evt.id === contactId);

    return contact !== undefined ? contact : "Not found";
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    const contact = result.filter((evt) => evt.id !== contactId);
    const findContact = result.find((evt) => evt.id === contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contact), "utf8");

    return findContact !== undefined ? findContact : "Not found";
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const g = new Generator();
  const data = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(data);
  try {
    const newContact = {
      id: g.newId(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    result.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
    return newContact;
  } catch (error) {
    console.error(error);
  }
};
const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);

  const contactToUpdate = contacts.find((contact) => contact.id === contactId);
  if (!contactToUpdate) return "Not found";

  const updatedContact = { ...contactToUpdate, ...body };
  const updatedContacts = contacts.map((contact) =>
    contact.id === contactId ? updatedContact : contact
  );

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
