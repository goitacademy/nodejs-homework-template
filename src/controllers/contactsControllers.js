const { Contact } = require("../models/contact");

const contactsList = async (req, res, next) => {
    const { page = 1, limit = 5, favorite = null } = req.query;
    const { _id } = req.user;

    const filterFavorite = favorite === null ? {} : { favorite };
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: _id, filterFavorite }).skip(skip).limit(limit);

    return res.status(200).json(contacts);
};

const getOneContactById = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);
    if (!contact) {
        return res.status(404).json({ "message": "Not found" });
    }
    return res.status(200).json(contact);
};

const addOneContact = async (req, res, next) => {
    const { name, email, phone, favorite } = req.body
    const newContact = await Contact.create({ name, email, phone, favorite, owner: req.user._id });
    return res.status(201).json({ newContact });
}

const removeContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndDelete(contactId);

    if (!removedContact) {
        return res.status(404).json({ "message": "Not found" });
    }

    return res.status(200).json({ "message": "contact deleted" });
}

const updateContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const changedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!changedContact) {
        return res.status(404).json({ "message": "not found" });
    }

    return res.status(200).json(changedContact);
};

const updateContactStatus = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const changedStatus = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!changedStatus) {
        res.status(404).json({ "message": "not found" });
    }

    return res.status(200).json(changedStatus);
}

module.exports = {
    contactsList,
    getOneContactById,
    removeContactById,
    addOneContact,
    updateContactById,
    updateContactStatus
}