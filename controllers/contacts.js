const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find(
        favorite ? { owner, favorite } : { owner },
        '-createdAt -updatedAt',
        { skip, limit }
    ).populate("owner", "name email");

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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner});
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