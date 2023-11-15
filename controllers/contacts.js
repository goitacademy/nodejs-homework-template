const addScheme = require('../models/contact')

const { Contact } = require('../models/contact')

const HttpErr = require('../helpers/HttpErr')

const {ctrlWrapper} = require('../helpers/ctrlWrapper')



const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const skip = (page - 1) * limit
    const { page = 1, limit = 3 } = req.query;
    const response = await Contact.find({owner}, {skip: skip, limit}).populate('owner', 'email');
    res.json(response)

};

const getById = async (req, res) => {
    const { contactId } = req.params
    const response = await Contact.findById(contactId)
    if (!response) {
        throw HttpErr(404, 'Not Foun')
    }
    res.json(response)
};

const addContact = async (req, res) => {
        const { _id: owner } = req.user; 
    const { error } = addScheme.validate(req.body)
    if (error) {
        throw HttpErr(400, error.message)
    }
    const response = await Contact.create({...req.body, owner});
    res.status(201).json(response);
};

const removeContact = async (req, res) => {
    const { id } = res.params;
    const response = await Contact.findByIdAndRemove(id)
    if (!response) {
        throw HttpErr(404, 'Not Foun')
    }
    res.status({
        message: 'Done'
    })
};

const updateContact = async (req, res) => {
    const { error } = addScheme.validate(req.body)
    if (error) {
        throw HttpErr(400, error.message)
    }
    const { id } = res.params;
    const response = await Contact.findOneAndUpdate(id, req.body, { new: true })
    if (!response) {
        throw HttpErr(404, 'Not Foun')
    }
    res.json(response);
};

const updateContactFavorite = async (req, res) => {
    const { error } = addScheme.validate(req.body)
    if (error) {
        throw HttpErr(400, error.message)
    }
    const { id } = res.params;
    const response = await Contact.findOneAndUpdate(id, req.body, { new: true })
    if (!response) {
        throw HttpErr(404, 'Not Foun')
    }
    res.json(response);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateContactFavorite: ctrlWrapper(updateContactFavorite)
}