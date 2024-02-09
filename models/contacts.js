import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "/models/contacts.json");

export const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    return contactsParsed;
  } catch (error) {
    return JSON.parse(error.message);
  }
};

export const getById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    const contact = contactsParsed.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    return JSON.parse(error.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    const index = contactsParsed.findIndex(
      (contact) => contact.id === contactId
    );

    if (index > -1) {
      contactsParsed.splice(index, 1);

      const updatedContacts = JSON.stringify(contactsParsed, null, 2);
      fs.writeFile(contactsPath, updatedContacts);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return console.log(error.message);
  }
};

export const addContact = async (body) => {
  try {
    const newContact = {
      id: nanoid(24),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);

    if (
      contactsParsed.find(
        (contact) =>
          contact.name?.toLowerCase() === newContact.name?.toLowerCase()
      )
    ) {
      return null;
    } else {
      contactsParsed.push(newContact);
    }
    const updatedContacts = JSON.stringify(contactsParsed, null, 2);
    await fs.writeFile(contactsPath, updatedContacts);
    return newContact;
  } catch (error) {
    return console.log(error.message);
  }
};

export const updateContacts = async (contactId, body) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    const index = contactsParsed.findIndex(
      (contact) => contact.id === contactId
    );

    if (index > -1) {
      contactsParsed[index] = { ...contactsParsed[index], ...body };

      await fs.writeFile(contactsPath, JSON.stringify(contactsParsed, null, 2));
      return contactsParsed[index];
    } else {
      return false;
    }
  } catch (error) {
    return console.log(error.message);
  }
};
