const contacts = require('../models/contacts');
const { HttpError, CtrlWrapper } = require('../helpers');

async function getAll(req, res) {
        const result = await contacts.listContacts();
        res.json(result);
};

async function getById(req, res){
        const { id } = req.params;
        const result = await contacts.getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found");
        };
        res.json(result);
};

async function add(req, res) {
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
};

async function update(req, res) {
        const { id } = req.params;
        const result = await contacts.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        };
        res.json(result);
};

async function del(req, res) {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found");
        };
        res.json({ message: 'contact deleted' });
};

module.exports = {
    getAll: CtrlWrapper(getAll),
    getById: CtrlWrapper(getById),
    add: CtrlWrapper(add),
    update: CtrlWrapper(update),
    del: CtrlWrapper(del),
};

