const contactsModel = require("../models/contacts");

const listContacts = async (req, res) => {
    try {
        const response = await contactsModel.listContacts();
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getContactById = async (req, res) => {
    const id = req.params;
    const result = await contactsModel.getContactById(id);
    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
};

const updateContact = async (req, res) => {
    const id = req.params;

    const updatedContact = await contactsModel.updateContact(id, req.body);
    if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(updatedContact);
};

const removeContact = async (req, res) => {
    const id = req.params;
    const removedContact = await contactsModel.removeContact(id);
    if (!removedContact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await contactsModel.addContact(name, email, phone);
    res.status(201).json(newContact);
};

module.exports = {
    listContacts,
    getContactById,
    updateContact,
    removeContact,
    addContact,
};
