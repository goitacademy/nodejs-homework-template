// const contacts = require("../models/contacts")
const {Contact} = require("../models/contacts/contacts")

// const {HttpError} = require("../helpers")

async function listContacts ( req, res, next) {
    try {
        const result = await Contact.find({});
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function getContactById (req, res, next) {
    try {
        const {id} = req.params;
        const result = await Contact.findById(id);
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
        const result = await Contact.findByIdAndDelete(id);
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
        const result = await Contact.create(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function updateContact (req, res, next) {
    try {
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
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

async function updateStatusContact (req, res, next) {
    try {
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
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
    updateStatusContact,
}

