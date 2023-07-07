const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
    const result = await Contact.find({}, '-createdAt -updatedAt');
    res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({
        message: 'Delete success'
    })
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite)
}