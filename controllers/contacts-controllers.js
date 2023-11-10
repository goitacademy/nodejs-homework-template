import * as contactService from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";

import { contactAddSchema, contactUpdateSchema } from "../schemas/contact-schemas.js";

const getAll = async (req, res, next) => {
    try {
        const result = await contactService.getAllContacts();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactService.getMovieById(id);
        if (!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
            // const error = new Error(`Movie with id=${id} not found`);
            // error.status = 404;
            // throw error;
            // return res.status(404).json({
            //     message: `Movie with id=${id} not found`
            // })
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const add = async(req, res, next)=> {
    try {
        const {error} = contactAddSchema.validate(req.body);
        if(error){
            throw HttpError(400, error.message);
        }
        const result = await contactService.addMovie(req.body);

        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
}

const updateById = async(req, res, next)=> {
    try {
        const {error} = contactUpdateSchema.validate(req.body);
        if(error){
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await contactService.updateMovieById(id, req.body);
        if (!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
        }

        res.json(result);
    }
    catch(error) {
        next(error);
    }
}

const deleteById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await contactService.deleteMovieById(id);
        if (!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
        }

        // res.status(204).send();

        res.json({
            message: "Delete success"
        })
    }
    catch(error) {
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