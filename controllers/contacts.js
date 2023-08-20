

const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");



const listContacts = async (req, res) => {
        const result = await contacts.listContacts();
        res.json(result);
};

const getById = async (req, res) => {
        const { id } = req.params;
        const result = await contacts.getById(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
};

const add = async (req, res) => {  
        const result = await contacts.add(req.body);
        res.status(201).json(result);
};

const updateById = async (req, res) => {    
        const { id } = req.params;
        const result = await contacts.updateById(id, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
};

const removeById = async (req, res) => {
        const { id } = req.params;
        const result = await contacts.removeById(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json({
            message: "Remove successfully"
        })
};

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    removeById: ctrlWrapper(removeById),
}