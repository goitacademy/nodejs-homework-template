import fs from 'fs/promises';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const contactsPath = './model/contacts.json';

// const json = JSON.parse(
//     await fs.readFile(new URL('./contacts.json', import.meta.url)),
// );

const listContacts = async () => {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath));
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getContactById = async contactId => {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath));
        const requiredContact = () => {
            const filtered = data.filter(
                ({ id }) => id.toString() === contactId,
            );
            if (filtered.length > 0) {
                return data.find(({ id }) => id.toString() === contactId);
            } else return 'Such contact not found';
        };
        return requiredContact();
    } catch (error) {
        console.log(error);
    }
};

const removeContact = async contactId => {
    try {
        const data = await fs.readFile(contactsPath);
        const parsedData = JSON.parse(data.toString());
        const newContacts = parsedData.filter(
            contact => contact.id.toString() !== contactId,
        );
        console.log(newContacts);
        // fs.writeFile(contactsPath, JSON.stringify(newContacts));
    } catch (error) {
        console.log(error);
    }
};

const addContact = async ({ name, email, phone }) => {
    try {
        const data = await fs.readFile(contacts);
        const parsedData = JSON.parse(data.toString());
        const newContacts = [
            ...parsedData,
            {
                id: parsedData.length + 1,
                name: name,
                email: email,
                phone: phone,
            },
        ];
        console.log(newContacts);
        fs.writeFile(contacts, JSON.stringify(newContacts));
    } catch (error) {
        console.log(error);
    }
};

const updateContact = async (contactId, { name, email, phone }) => {
    try {
        const data = await fs.readFile(contacts);
        const parsedData = JSON.parse(data.toString());
        const requiedContact = parsedData.find(
            ({ id }) => id.toString() === contactId,
        );
        const newContacts = [...parsedData, requiedContact];
    } catch (error) {
        console.log(error);
    }
};

export {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
