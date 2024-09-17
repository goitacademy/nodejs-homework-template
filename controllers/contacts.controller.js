const { getAllContacts, getContactsById, createContacts, removeContacts, updateContacts, updateStatusContact } = require("../service/contacts.service");

const getContacts = async (_, res) => {
    const listContacts = await getAllContacts();

    return res.json(listContacts)
}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);

    if (!contact) return res.status(404).json({ message: "Not found" })

    return res.json(contact)
}

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await removeContacts(contactId);

    if (!contact) return res.status(404).json({ message: "Not found" })

    return res.status(201).json({ message: "contact deleted" })
}

const createContact = async (req, res) => {
    const contact = await createContacts(req.body);

    return res.status(201).json(contact)
}

const putContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await updateContacts(contactId, req.body);

    if (!contact) return res.status(404).json({ message: "Not found" })

    return res.json(contact)
}

const patchContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await updateStatusContact(contactId, req.body);

    if (!contact) return res.status(404).json({ message: "Not found", params: req.params })

    return res.json(contact)
}

module.exports = { getContacts, getContactById, createContact, deleteContactById, putContact, patchContact }