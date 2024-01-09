import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
// import { contactAddSchema, contactUpdateSchema } from "../models/Contact.js";
import { request } from "express";


const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findById(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
            // const error = new Error(`Contact with id=${id} not found`);
            // error.status = 404;
            // throw error;
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
  
const add = async (req, res, next) => {
    try {
        const { error } = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await Contact.create(req.body);
        res.status(201).json(result)
    }
    catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { error } = contactUpdateSchema.validate(request.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
         if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json({
            message:"Contact delete"
        });
    }
    catch (error) {
        next(error);
    }
}
export default {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}