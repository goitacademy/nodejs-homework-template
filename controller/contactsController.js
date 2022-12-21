const Contact = require('../models/contact');
const HttpError = require("../helpers/HttpErrors");

const get = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if (contacts.length === 0) {
            throw HttpError(404, "Not found");
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contacts },
        })
    } catch (error) {
        const { status = 500, message = 'Server error' } = error;
        res.status(status).json({ message });
    }
};

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);
        if (!contact) {
            throw HttpError(404, "Not found");
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contact },
        })
    } catch (error) {
        const { status = 500, message = 'Server error' } = error;
        res.status(status).json({ message });
    }
};

const add = async (req, res, next) => {
    try {
        const newContactBody = req.body;

        const newContact = await Contact.create(newContactBody);
        res.json({
            status: 'success',
            code: 201,
            data: { newContact },
        })
    } catch (error) {
        const { status = 500, message = 'Server error' } = error;
        res.status(status).json({ message });
    }
};

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const results = await Contact.findByIdAndRemove(contactId);
        if (!results) {
            throw HttpError(404, "Not found");
        }
        res.json({
            status: 'success',
            code: 200,
            message: "contact deleted",
        })
    } catch (error) {
        const { status = 500, message = 'Server error' } = error;
        res.status(status).json({ message });
    }
};

const update = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contactBody = req.body;

        const changedContact = await Contact.findByIdAndUpdate(contactId, contactBody, {new: true});
        if (!changedContact) {
            throw HttpError(404, "Not found");
        }
        res.json({
            status: 'success',
            code: 200,
            data: { changedContact },
        })
    } catch (error) {
        const { status = 500, message = 'Server error' } = error;
        res.status(status).json({ message });
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contactBody = req.body;

        const changedFavorite = await Contact.findByIdAndUpdate(contactId, contactBody);
        if (!changedFavorite) {
            throw HttpError(404, "Not found");
        }
        res.json({
            status: 'success',
            code: 200,
            data: { changedFavorite },
        })
    } catch (error) {
        const { status = 500, message = 'Server error' } = error;
        res.status(status).json({ message });
    }
}

module.exports = {
    get,
    getById,
    add,
    remove,
    update,
    updateStatusContact
}