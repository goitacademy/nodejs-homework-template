const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
    const result = await Contact.find({}, '-createdAt -updatedAt');
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({
        message: 'Delete success'
    })
};

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

const updateFavoriteContact = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateFavoriteContact: ctrlWrapper(updateFavoriteContact)
}