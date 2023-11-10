import { HttpError } from '../helpers/HttpError.js';
import { Contact, addSchema, patchSchema, putSchema } from '../models/contact.js';

export const getAll = async (req, res) => {
    const result = await Contact.find();
    res.status(200).json(result);
};

export const getById = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findOne({ _id: contactId });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
};

export const postContact = async (req, res) => {
    const { error } = addSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

export const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json({
        message: 'Contact deleted'
    });
};

export const putContact = async (req, res) => {
    const { error } = putSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
};

export const updateStatusContact = async (req, res) => {
    const { error } = patchSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
};
