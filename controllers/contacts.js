const contact = require("../models/contacts");
const notFoundMiddleware = require("../middlewares/notFound");



const getAll = async (_, res) => {
    const result = await contact.listContacts();
    res.json(result);
};

const getById = async (req,res) => {
    const result = await contact.getContactById(req.params.contactId);
    if(!result) {
        const err = Error(`Requested path ${req.path} not found`);
        return res.status(404).send({
        message: "Not found",
        });
    }

    return res.json(result);
};

const addContact = async (req,res) => {
    const result = await contact.addContact(req.body);
    if(!result) {
        const err = Error(`Requested path ${req.path} not found`);
        return res.status(400).send({
        message: "Not found",
        });
    }
    return res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const result = await contact.removeContact(req.params.contactId);

    if(!result){
        const err = Error(`Requested path ${req.path} not found`);
        return res.status(404).send({
        message: "Not found",
        });
    }

    return res.status(200).json({message: "This contact was deleted" });
};

const updateContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await contact.updateContact(contactId, req.body);

    if(!req.body) {
        const err = Error(`Requested path ${req.path} not found`);
        return res.status(400).send({
        message: "Not found",
        });
    } else if (!result) {
        const err = Error(`Requested path ${req.path} not found`);
        return res.status(404).send({
        message: "Not found",
        });
    }

    return res.status(200).json(result);
};


module.exports = {
    getAll,
    getById,
    addContact,
    removeContact,
    updateContact
}