const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const {
    newContactAuthSchema,
    editContactAuthSchema,
} = require("../validation/validation");

const contactsFile = path.basename("./models/contacts.json");
const contactsDir = path.dirname("./models/contacts.json");
const contactsPath = path.join(contactsDir, contactsFile);

const listContacts = async () => {
    return readFile(contactsPath, "utf8")
        .then((data) => JSON.parse(data))
        .catch((err) => console.log(err.message));
};

const getContactById = async (contactId) => {
    try {
        const data = await readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        const index = contacts.findIndex((contact) => contact.id === contactId);

        return contacts[index];
    } catch (err) {
        console.log(err.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const data = await readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        const index = contacts.findIndex((contact) => contact.id === contactId);
        if (index === -1) {
            return;
        } else {
            contacts.splice(index, 1);
            const newContacts = JSON.stringify(contacts);
            await writeFile(contactsPath, newContacts, (err) => {
                if (err) console.log(err.message);
            });
            const successMessage = "contact deleted";
            return successMessage;
        }
    } catch (err) {
        console.log(err.message);
    }
};

const addContact = async (body) => {
    try {
        await newContactAuthSchema.validateAsync(body);
        body.email = body.email.toLowerCase();
        const data = await readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        contacts.push(body);
        const newContacts = JSON.stringify(contacts);
        writeFile(contactsPath, newContacts, (err) => {
            if (err) console.log(err.message);
        });
        return body;
    } catch (err) {
        if (err.isJoi) {
            err.status = 400;
            return err;
        }
        console.log(err.message);
    }
};

const updateContact = async (contactId, body) => {
    try {
        const { name, email, phone } = body;
        if (!name && !email && !phone) {
            const result = 400;
            return result;
        } else {
            const data = await readFile(contactsPath, "utf8");
            const contacts = JSON.parse(data);
            const index = contacts.findIndex(
                (contact) => contact.id === contactId
            );
            if (index === -1) {
                return;
            } else {
                await editContactAuthSchema.validateAsync(body);
                const contactToEdit = contacts[index];
                if (name) contactToEdit.name = name;
                if (email) contactToEdit.email = email.toLowerCase();
                if (phone) contactToEdit.phone = phone;
                contacts.splice(index, 1, contactToEdit);
                const newContacts = JSON.stringify(contacts);
                writeFile(contactsPath, newContacts, (err) => {
                    if (err) console.log(err.message);
                });
                return contactToEdit;
            }
        }
    } catch (err) {
        if (err.isJoi) {
            err.status = 400;
            return err;
        }
        console.log(err.message);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
