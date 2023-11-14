import * as movieService from "../models/movies/index.js";

import { HttpError } from "../helpers/index.js";

import { movieAddSchema, movieUpdateSchema } from "../schemas/movie-schemas.js";

const getAll = async (req, res, next) => {
    try {
        const result = await movieService.getAllMovies();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await movieService.getMovieById(id);
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
        const {error} = movieAddSchema.validate(req.body);
        if(error){
            throw HttpError(400, error.message);
        }
        const result = await movieService.addMovie(req.body);

        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
}

const updateById = async(req, res, next)=> {
    try {
        const {error} = movieUpdateSchema.validate(req.body);
        if(error){
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await movieService.updateMovieById(id, req.body);
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
        const result = await movieService.deleteMovieById(id);
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