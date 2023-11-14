const { errorHttp } = require("../error");
const Contact = require("../models/contacts");

const getAll = async(req, res, next) => {
    try {
        const result = await Contact.find();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getById = async(req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);
        if (!contact) {
            next();
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const add = async(req, res, next) => {
    try {
        const newContact = await Contact.create(req.body);
        console.log(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

const deleteById = async(req, res, next) => {
    try {
        const { contactId } = req.params;

        const contact = await Contact.findByIdAndDelete(contactId);

        if (!contact) {
            next();
        }
        res.status(200).json({ message: "contact deleted" });
    } catch (error) {
        next(error);
    }
};

const updateById = async(req, res, next) => {
    try {
        if (!req.body) {
            throw errorHttp(400, "missing fields");
        }

        const { contactId } = req.params;
        const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        });

        if (contact) {
            res.status(200).json(contact);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const updateFavorite = async(req, res, next) => {
    try {
        if (!req.body) {
            throw errorHttp(400, "missing fields");
        }

        const { contactId } = req.params;
        const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        });

        if (contact) {
            res.status(200).json(contact);
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    updateFavorite,
};