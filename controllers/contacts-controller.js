import Contact, { contactUpdateFavoriteSchema } from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSchema, contactUpdateSchema } from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";


const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

const getByID = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
};

const add = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
        throw HttpError(400, error.message);
    };

    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const updateByID = async (req, res) => {
    const { error } = contactUpdateSchema.validate(req.body);
    const { id } = req.params;

    if (error) {
        throw HttpError(400, error.message);
    };

    const result = await Contact.findByIdAndUpdate(id, req.body);
        
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
};

const updateFavorite = async (req, res) => {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    const { id } = req.params;

    if (error) {
        throw HttpError(400, error.message);
    };

    const result = await Contact.findByIdAndUpdate(id, req.body);
        
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json({ message: "Contact deleted" });
};

export default {
    getAll: ctrlWrapper(getAll),
    getByID: ctrlWrapper(getByID),
    add: ctrlWrapper(add),
    updateByID: ctrlWrapper(updateByID),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
};