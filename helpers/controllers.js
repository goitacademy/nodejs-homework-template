const contacts = require("./../models/contacts");
const httpError = require("./httpError");
// const validation = require("./validation");

async function getContacts(req, res, next) {
    try {
        const result = await contacts.listContacts();
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
    }

async function getContactId(req, res, next) {
try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result) {
    throw httpError.HttpError(404, `Not found`);
    }
    res.status(200).json(result);
}
catch(error) {
    next(error);
}
}


async function addContact(req, res, next) {
try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}
catch(error) {
    next(error);
}
}

async function deieteContactId(req, res, next) {
try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result) {
    throw httpError.HttpError(404, `Not found`);
    }
    res.status(200).json(
    {message: "contact deleted"}
    )
    
}
catch(error) {
    next(error);
}
}

async function putContactId(req, res, next) {
try {
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result) {
    throw httpError.HttpError(404, `Not found`);
    }
    res.status(200).json(result);
}
catch(error) {
    next(error);
}
}

module.exports = {
    getContacts,
    getContactId,
    addContact,
    deieteContactId,
    putContactId,
};