import fs from 'fs/promises';
import pickid from 'pickid';
import Contact from '../db/contactsModel.js';
const contactsList = './model/contacts.json';

const listContacts = async () => {
    try {
        return await Contact.find({});
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById = async contactId => {
    try {
        return await Contact.findById(contactId);
    } catch (error) {
        console.log(error.message);
    }
};

const deleteContact = async contactId => {
    try {
        await Contact.findByIdAndRemove(contactId);
    } catch (error) {
        console.log(error.message);
    }
};

const addContact = async ({ name, email, phone }) => {
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
        });
        await newContact.save();
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

const updateContact = async (contactId, { name, email, phone }, res) => {
    try {
        await Contact.findByIdAndUpdate(contactId, {
            name,
            email,
            phone,
        });
        res.status(200).json({
            message: `Contact with ID '${contactId}' successfully updated`,
        });
    } catch (error) {
        console.log(error.message);
        res.status(200).json({
            message: `Contact with ID '${contactId}' not found`,
        });
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
