import fs from "fs/promises";
import path from "path";
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
    const [contact] = contactsParsed.filter(
      (contact) => contact.id === contactId
    );
    return contact;
  } catch (error) {
    return JSON.parse(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsParsed = JSON.parse(contacts);
    const index = contactsParsed.findIndex(
      (contact) => contact.id === contactId
    );

    if (index > 0) {
      contactsParsed.splice(index, 1);

      const updatedContacts = JSON.stringify(contactsParsed, null, 2);
      console.log(
        `Contact "${contactsParsed[index].name}" successfully removed`
      );
      return fs.writeFile(contactsPath, updatedContacts);
    } else {
      return console.log(
        `The contact with ID "${contactId}" that you want to delete does not exist in your contacts.`
      );
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

// const updateContact = async (contactId, body) => {};
