import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/HttpError.js";
import Joi from "joi";
import { ctrlWrapper } from "../helpers/ctrlWrapeer.js";

const controlPost = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const controlPut = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const controlPatch = Joi.object({
    favorite: Joi.boolean().required(),
});

const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    console.log(result);
    if (!result) {
        throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
};

const postAddContact = async (req, res) => {
    const { error } = controlPost.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, "Sorry:) Not found.");
    }
    res.json({ message: "contact deleted" });
};
const putUpdateById = async (req, res) => {
    if (!req.body) {
        throw HttpError(400, "missing fields");
    }
    const { error } = controlPut.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
};

const patchUpdateById = async (req, res) => {
    if (!req.body) {
        throw HttpError(400, "missing field favorite");
    }
    const { error } = controlPatch.validate(req.body);
    if (error) {
        throw HttpError(400, "missing field favorite");
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    postAddContact: ctrlWrapper(postAddContact),
    deleteById: ctrlWrapper(deleteById),
    putUpdateById: ctrlWrapper(putUpdateById),
    patchUpdateById: ctrlWrapper(patchUpdateById),
};