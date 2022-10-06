const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("models/contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contact = JSON.parse(data).find(
      (contact) => contact.id.toString() === contactId.toString()
    );
    if (contact) {
      return contact;
    }
    return null;
  } catch (error) {
    return console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contact = await JSON.parse(data).find(
      (contact) => contact.id.toString() === contactId.toString()
    );
    if (contact) {
      const filteredData = JSON.parse(data).filter(
        (contact) => contact.id.toString() !== contactId.toString()
      );
      await fs.writeFile(contactsPath, JSON.stringify(filteredData));
      return contact;
    }
    return null;
  } catch (error) {
    return console.error(error.message);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    if (
      parsedData.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return `Contact with name ${name} is already taken`;
    }
    if (parsedData.find((contact) => contact.email === email)) {
      return `Contact with email ${email} is already taken`;
    }
    if (parsedData.find((contact) => contact.phone === phone)) {
      return `Contact with phone ${phone} is already taken`;
    }
    const contact = { id: uuidv4(), name, email, phone };
    parsedData.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(parsedData));
    return { contact };
  } catch (error) {
    return console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contact = await JSON.parse(data).find(
      (contact) => contact.id.toString() === contactId.toString()
    );
    if (contact) {
      const { name, email, phone } = body;

      const filteredData = JSON.parse(data).filter(
        (contact) => contact.id.toString() !== contactId.toString()
      );
      const updatedContact = {
        id: contactId.toString(),
        name,
        email,
        phone,
      };

      filteredData.push(updatedContact);
      filteredData.sort((a, b) => a.id - b.id);
      console.log(filteredData);
      await fs.writeFile(contactsPath, JSON.stringify(filteredData));
      return updatedContact;
    }
    return null;
  } catch (error) {
    return console.error(error.message);
  }
};
updateContact(1, {
  name: "Allen Raymond",
  email: "nulla.ante@vestibul.co.uk",
  phone: "(992) 914-3792",
});
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

updateContact("123213");
