import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";

export const listContacts = async () => {
  try {
    const data = await readFile("models/contacts.json");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return await contacts.find((item) => item.id === contactId);
  } catch (error) {
    return error;
  }
};

export const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = nanoid();
    const newContact = { id: id, ...body };
    const updatedContacts = [...contacts, newContact];
    await writeFile("models/contacts.json", JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    return error;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    if (await contacts.find((item) => item.id === contactId)) {
      const updatedContacts = await contacts.filter(
        (item) => item.id !== contactId
      );
      await writeFile("models/contacts.json", JSON.stringify(updatedContacts));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

export const updateContact = async (contactId, obj) => {
  try {
    const contacts = await listContacts();
    const isOnList = await contacts.find((item) => item.id === contactId);
    if (isOnList) {
      const updatedContacts = await contacts.map((item) =>
        item.id === contactId ? { ...item, ...obj } : item
      );
      await writeFile("models/contacts.json", JSON.stringify(updatedContacts));
      return {
        isOnList: true,
        contact: updatedContacts.find((item) => item.id === contactId),
      };
    } else {
      return { isOnList: false, contact: null };
    }
  } catch (error) {
    return error;
  }
};
