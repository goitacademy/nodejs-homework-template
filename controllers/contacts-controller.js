import Contact from "../models/Contact.js";

import { HttpError } from "../helpers/index.js";

import { contactAddSchema, contactUpdateSchema } from "../models/Contact.js";
import {ctrlWrapper} from "../decorators/index.js";

const getAll = async (req, res, next) => {
    const { _id: owner } = req.user;
    console.log("owner - ", owner);

    const {page = 1, limit = 20, favorite = false} = req.query;
    const skip = (page - 1) * limit;
    console.log("favorite - ", favorite);
    if (favorite) {
        const result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "username");
        res.json(result);
        return;
    } 

    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "username");
    res.json(result);
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findById(contactId, owner);
    if (!result) {
        throw HttpError(404, `Contacts with id=${contactId} not found`);
    }
    res.json(result);
}

const add = async (req, res, next) => {
    const { _id: owner } = req.user;
    console.log("owner - ", owner);
    
    const result = await Contact.create({...req.body, owner});

    res.status(201).json(result)
}

const updateById = async (req, res, next) => { 
    const {_id: owner} = req.user;
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate({contactId, owner}, req.body, {new: true});
    if (!result) {
         throw HttpError(404, `Contact with id=${contactId} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete({contactId, owner});
    if (!result) {
        throw HttpError(404, `Contact with id=${contactId} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}