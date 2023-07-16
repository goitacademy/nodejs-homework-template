const contactsModels = require("../models/contacts");

const getContacts = async (_, res) => {
    const listContacts = await contactsModels.listContacts();

    return res.json(listContacts)
}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contactsModels.getById(contactId);

    if (!contact) return res.status(404).json({ message: "Not found" })

    return res.json(contact)
}

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contactsModels.removeContact(contactId);

    if (!contact) return res.status(404).json({ message: "Not found" })

    return res.status(201).json({ message: "contact deleted" })
}

const createContact = async (req, res) => {
    const contact = await contactsModels.addContact(req.body);

    return res.status(201).json(contact)
}

const putContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contactsModels.updateContact(contactId, req.body);

    if (!contact) return res.status(404).json({ message: "Not found" })

    return res.json(contact)
}



module.exports = { getContacts, getContactById, createContact, deleteContactById, putContact }