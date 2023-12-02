import { Contact } from '../models/Contact.js';
import { HttpError } from '../helpers/HttpError.js';

export const getAll = async (req, res, next) => {
    const { page = "1", limit = "10", ...query } = req.query;
    const { _id: owner } = req.user

    const result = await Contact.find(filter, "-createdAt -updatedAt", {
        limit,
        skip:(page-1) * limit,
    })
    const total = await Contact.countDocuments(filter);
    res.json({data: result, totalHits: total.toString(), page, perPage: limit});
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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner});
    res.status(201).json({
        name: result.name,
        email: result.email,
        phone: result.phone,
        favorite: result.favorite,
        id: result._id
    })
}

export const updateById = async (req, res, next) => {
    const { _id: owner } = req.user;
    const _id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate({_id, owner}, req.body, {
        new: true,
        select: '-createdAt',
    })
    if (!result) {
        return next(HttpError(404, `Not found`))
    }
    res.status(200).json(result)
}

export const updateStatusContact = async (req, res, next) => {
    const { _id: owner } = req.user;
    const _id = req.params.contactId;

    if (typeof body.favorite === 'undefined') {
        return res.status(400).json({ message: 'Missing field favorite' });
    }

    const result = await Contact.findByIdAndUpdate({_id, owner}, req.body, {
        new: true,
        select: '-createdAt',
    });
    if (!result) {
        return next(HttpError(404, 'Not found'))
    }
    res.status(200).json(result)
}

export const deleteById = async (req, res, next) => {
    const { _id: owner } = req.user
    const _id = req.params.contactId;
    const result = await Contact.findByIdAndDelete({ _id, owner});
        if (!result) {
            return next(HttpError(404, `Not found`))
        }
        res.status(200).json({
            message: "Delete success"
        })
    }