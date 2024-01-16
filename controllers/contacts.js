const contacts = require("../models/contacts")

const { HttpError, ctrlWrapper } = require("../helpers");


const listContacts = async (req,res) => {
    const data = await contacts.listContacts();
     res.json(data);
}

const getContactById = async(req,res)=> {
    const { id } = req.params;
    const result = await contacts.getContactId(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const removeContact = async(res,req)=> {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}

const addContact = async (req,res)=> {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const updateContact = async (req,res) => {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContact: ctrlWrapper(removeContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
}


