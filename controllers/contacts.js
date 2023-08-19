const ContactModel = require('../models/ContactModel.js');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../helpers');

const getAll = asyncHandler(async (req, res) => {
    const contacts = await ContactModel.find({});
    res.status(200).json({
        code: 200,
        message: 'success',
        quantity: contacts.length,
        data: contacts
    });
});

const getById = asyncHandler(async (req, res) => {
    const contact = await ContactModel.findById(req.params.contactId);
    if (!contact) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({
        code: 200,
        message: 'success',
        data: contact,
    });
});

const add = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw HttpError(400, 'Provide all fields data');
    }
    const result = await ContactModel.create({ ...req.body });
    res.status(201).json({
        code: 201,
        message: 'success',
        data: result,
    });
});

const deleteById = asyncHandler(async (req, res) => {
    const result = await ContactModel.findByIdAndRemove(req.params.contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({
        code: 200,
        message: 'success',
        data: result,
    })
});

const updateById = asyncHandler(async (req, res) => {
    const result = await ContactModel.findByIdAndUpdate(
        req.params.contactId,
        { ...req.body },
        { new: true }
    );
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({
        code: 200,
        message: 'success',
        data: result,
    });
});

const updateStatusContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;
    const result = await ContactModel.findByIdAndUpdate(
        contactId,
        { ...req.body },
        { new: true }
    );
    if (!Object.keys(req.body).includes('favorite')) {
        throw HttpError(400, 'missing field favorite');
    }
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({
        code: 200,
        message: 'success',
        data: result,
    });
});

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    updateStatusContact,
};


