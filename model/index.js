import fs from 'fs/promises';
import { request } from 'express';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const contactsList = './model/contacts.json';

// const json = JSON.parse(
//     await fs.readFile(new URL('./contacts.json', import.meta.url)),
// );

const listContacts = async () => {
    try {
        return JSON.parse(await fs.readFile(contactsList));
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById = async reqId => {
    try {
        const list = JSON.parse(await fs.readFile(contactsList));
        return list.find(({ id }) => id.toString() === reqId);
    } catch (error) {
        console.log(error.message);
    }
};

const deleteContact = async contactId => {
    try {
        const list = JSON.parse(await fs.readFile(contactsList));
        const newContactsList = list.filter(
            ({ id }) => id.toString() !== contactId,
        );
        fs.writeFile(contactsList, JSON.stringify(newContactsList));
    } catch (error) {
        console.log(error.message);
    }
};

const addContact = async ({ name, email, phone }) => {
    try {
        const data = JSON.parse(await fs.readFile(contactsList));
        const newContacts = [
            ...data,
            {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
            },
        ];
        fs.writeFile(contactsList, JSON.stringify(newContacts));
    } catch (error) {
        console.log(error.message);
    }
};

const updateContact = async (contactId, { name, email, phone }) => {
    try {
        const list = JSON.parse(await fs.readFile(contactsList));
        const requiedContact = list.find(
            ({ id }) => id.toString() === contactId,
        );
        requiedContact.name = name;
        requiedContact.email = email;
        requiedContact.phone = phone;
        return [...list, requiedContact];
    } catch (error) {
        console.log(error.message);
    }
};

export {
    listContacts,
    getContactById,
    deleteContact,
    addContact,
    updateContact,
};
