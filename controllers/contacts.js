const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
    const { page = 1, limit = 20, favorite = null } = req.query;
    const skip = (page - 1) * limit;

    if (favorite) {
        const result = await Contact.find(
            { owner: req.user._id, favorite },
            '-createdAt -updatedAt -owner -_id',
            { skip, limit }
        );
        res.json(result);
        return;
    }

    const result = await Contact.find(
        { owner: req.user._id },
        '-createdAt -updatedAt -owner -_id',
        { skip, limit }
    );
    res.json(result);
};

const getContactById = async (req, res) => {
    const result = await Contact.findById(req.params.contactId);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await Contact.create({ ...req.body, owner: req.user._id });
    if (!result)
        throw HttpError(400, `${req.body.name} is already in contacts!`);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const result = await Contact.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        { new: true }
    );
    if (!result) throw HttpError(404, 'Not Found!');
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const result = await Contact.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        { new: true }
    );
    if (!result) throw HttpError(404, 'Not Found!');
    res.json(result);
};

const removeContact = async (req, res) => {
    const result = await Contact.findByIdAndDelete(req.params.contactId);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json({ message: 'Contact deleted!' });
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    removeContact: ctrlWrapper(removeContact),
};
