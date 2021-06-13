import fs from 'fs/promises';
import pickid from 'pickid';
const contactsList = './model/contacts.json';

const listContacts = async () => {
    try {
        return JSON.parse(await fs.readFile(contactsList));
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById = async contactId => {
    try {
        const list = await listContacts();
        return list.find(({ id }) => id.toString() === contactId);
    } catch (error) {
        console.log(error.message);
    }
};

const deleteContact = async contactId => {
    try {
        const list = await listContacts();
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
        const list = await listContacts();
        const newContact = {
            id: pickid(),
            name,
            email,
            phone,
        };
        fs.writeFile(contactsList, JSON.stringify([...list, newContact]));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

const updateContact = async (contactId, { name, email, phone }, res) => {
    try {
        const list = await listContacts();
        const isValidId = list.filter(
            contact => contact.id.toString() === contactId,
        );
        if (isValidId.length === 0) {
            return res.status(404).json({
                message: `Contact with ID '${contactId}' was not found`,
            });
        }
        const newContactList = list.map(contact =>
            contact.id.toString() === contactId
                ? { id: contactId, name, email, phone }
                : contact,
        );
        fs.writeFile(contactsList, JSON.stringify(newContactList));
        res.status(200).json({
            message: `Contact with ID '${contactId}' successfully updated`,
        });
    } catch (error) {
        console.log(error.message);
    }
};

const changeContact = async (contactId, { name, email, phone }, res) => {
    try {
        const list = await listContacts();
        const isValidId = list.filter(
            contact => contact.id.toString() === contactId,
        );
        if (isValidId.length === 0) {
            return res.status(404).json({
                message: `Contact with ID '${contactId}' was not found`,
            });
        }

        const newContactList = list.map(contact =>
            contact.id.toString() === contactId
                ? {
                    id: contactId,
                    name: name || contact.name,
                    email: email || contact.email,
                    phone: phone || contact.phone,
                }
                : contact,
        );
        fs.writeFile(contactsList, JSON.stringify(newContactList));
        res.status(200).json({
            message: `Contact with ID '${contactId}' successfully changed`,
        });
    } catch (error) {}
};

export {
    listContacts,
    getContactById,
    deleteContact,
    addContact,
    updateContact,
    changeContact,
};
