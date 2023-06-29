const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");



const getAllContacts = async (req, res) => {
            const result = await contacts.listContacts();
        res.json(result);
    };

const getByID = async (req, res) => {
            const { id } = req.params;
        const result = await contacts.getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    };

const postContact = async (req, res) => {
        
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    };

const deleteContact = async (req, res) => {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json({
            message: "Delete success"
        });
    };

const updateById = async (req, res) => {
        const { id } = req.params;        
        const result = await contacts.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    };

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getByID: ctrlWrapper(getByID),
    postContact: ctrlWrapper(postContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateById: ctrlWrapper(updateById),
}