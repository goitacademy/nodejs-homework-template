import Contact, { contactUpdateFavoriteSchema } from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSchema, contactUpdateSchema } from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";


const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact
        .find(favorite ? { owner, favorite } : { owner }, "", { skip, limit })
        .populate("owner", ["email", "subscription"]);
    
    res.json(result);
};

const getByID = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ _id: id, owner });

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

    const { _id: owner } = req.user;

    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
};

const updateByID = async (req, res) => {
    const { error } = contactUpdateSchema.validate(req.body);
    const { id } = req.params;
    const { _id: owner } = req.user;

    if (error) {
        throw HttpError(400, error.message);
    };

    console.log(req.body);
    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
        
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
};

const updateFavorite = async (req, res) => {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    const { id } = req.params;
    const { _id: owner } = req.user;

    if (error) {
        throw HttpError(400, error.message);
    };

    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
        
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ _id: id, owner });

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