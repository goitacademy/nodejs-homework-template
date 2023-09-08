
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../models/contacts')
const { HttpError, ctrlWrapper } = require('../helpers')


const getAll = async (req, res) => {
    const contacts = await listContacts()
    res.json(contacts)
}

const getById = async (req, res) => {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (!contact) {
        throw HttpError(404, "Not found")
    }
    res.json(contact)
}

const add = async (req, res) => {

    const result = await addContact(req.body)
    res.status(201).json(result)
}

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(400, "Not found");
    }
    res.json(result)
}

const deleteById = async (req, res, next) => {
    const { contactId } = req.params
    const result = await removeContact(contactId);

    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json({
        message: "Contact deleted"
    })
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById)
}