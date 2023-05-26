const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../decorators");

const { HttpError } = require("../helpers");

const { schemas } = require('../models/contact')

const getAllContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
};

const getContactById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    };
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const removeContactById = async (req, res, next) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    };
    res.status(200).json({
        message: "contact deleted"
    })
};

const updateContactById = async (req, res) => {
    const {id} = req.params;
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
        throw HttpError(400, `missing fields`);
    }
    
    const {error} = schemas.contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message)
    };

    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    
    if (!result) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const {id} = req.params;
    
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    
    if (!result) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContactById: ctrlWrapper(removeContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}