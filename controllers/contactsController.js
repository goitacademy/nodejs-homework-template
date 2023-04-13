const { getContactById, getListContacts, updateContact, removeContact, addContact } = require("../models/contacts");

const getContacts = async (req, res, next) => {
    const contacts = await getListContacts();
    res.status(200).json(contacts);
};


const getContactDataById = async (req, res, next) => {
    const  id = req.params.contactId;

    const contactDataById = await getContactById(id);
    if (!contactDataById) {
        return res.status(404).json({ "message": `Contact with id ${id} wasn't  found` });

    }
    res.status(200).json(contactDataById);
};


const addNewContact = async (req, res, next) => {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
};

const deleteContactById = async (req, res, next) => {
    const id  = req.params.contactId;
    const contactById = await getContactById(id);
    if (!contactById) {
        return res.status(404).json({ "message": `Contact with id ${id} wasn't  found` });
    }

    await removeContact(id);
    res.status(200).json({ "message": "contact deleted" });
};

const updateContactById = async (req, res, next) => {

 
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
        res.status(404).json({ "message": `Contact with id ${req.params.contactId} wasn't  found` });

    }
    res.status(200).json(updatedContact);

};

module.exports = {
    getContacts,
    getContactDataById,
    addNewContact,
    deleteContactById,
    updateContactById
}