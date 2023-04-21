const contacts = require("../models")

// const {HttpError} = require("../helpers")

async function listContacts ( req, res, next) {
    try {
        const result = await contacts.listContacts();
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function getContactById (req, res, next) {
    try {
        const {id} = req.params;
        const result = await contacts.getContactById(id);
        if(!result) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function removeContact (req, res, next) {
    try {
        const {id} = req.params;
        const result = await contacts.removeContact(id);
        if(!result) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        return res.status(200).json({
            message: "contact deleted"
        })
    }
    catch(error) {
        next(error);
    }
}

async function addContact (req, res, next) {
    try {
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function updateContact (req, res, next) {
    try {
        const {id} = req.params;
        const result = await contacts.updateContact(id, req.body);
        if(!result) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}

