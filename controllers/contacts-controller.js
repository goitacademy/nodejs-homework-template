import { Contact } from '../models/Contact.js';

import { HttpError } from '../helpers/HttpError.js';

export const getAll = async (req, res, next) => {
        const result = await Contact.find()
        res.json(result);
}

export const getById = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Not found`)
    }
    res.json(result);
}

export const add = async (req, res) => {
    const result = await Contact.create(req.body)   
    res.status(201).json(result)
}

export const updateById = async (req, res, next) => {
    const id = req.params.contactId
    const result = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
        select: '-createdAt',
    })
    if (!result) {
        return next(HttpError(404, `Not found`))
    }
    res.status(200).json(result)
}

export const updateStatusContact = async (req, res, next) => {
    const id = req.params.contactId;
    const body = req.body;
    const result = await Contact.findByIdAndUpdate(id, body, {
        new: true,
        select: '-createdAt',
    });
    if (!result) {
        return next(HttpError(404, 'Not found'))
    }
    res.status(200).json(result)
}

export const deleteById = async (req, res, next) => {
        const id = req.params.contactId;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            return next(HttpError(404, `Not found`))
        }
        res.status(200).json({
            message: "Delete success"
        })
    }