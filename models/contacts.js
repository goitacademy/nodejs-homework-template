// const fs = require('fs/promises')
import { readFile, writeFile } from 'node:fs/promises';
import { join } from "path";

const directoryName = "models"
const fileName = "contacts.json"
const contactsPath = join(directoryName, fileName);

export const listContacts = async () => {
    try {
        const contacts = await readFile(contactsPath, { encoding: "utf-8" });
        return contacts
    } catch (error) {
        console.log(error);
    }
}

export const getContactById = async (contactId) => { }

export const removeContact = async (contactId) => { }

export const addContact = async (body) => { }

export const updateContact = async (contactId, body) => { }

//module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
