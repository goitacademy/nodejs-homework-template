import { HttpError } from '../helpers/index.js';
import {ctrlWrapper} from '../decorators/index.js';
import Contact from '../models/contact.js';


const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find(
        { owner, favorite: favorite ?? [true, false] },
        "-createdAt -updatedAt",
        { skip, limit })
        .populate("owner", "email subscription");

    res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, `Movie with id=${contactId} not found`)
    }
    res.json(result);
};

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw HttpError(404, `Movie with id=${contactId} not found`)
    }
    res.status(200).json({ message: "Contact deleted" })
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Movie with id=${contactId} not found`)
    }
    res.json(result);
};

const updateStatusContact  = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Movie with id=${contactId} not found`)
    }
    res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateStatusContact : ctrlWrapper(updateStatusContact ),
};