import express from "express";
import Joi from "joi";

import moviesService from "../../models/movies/index.js";

import {HttpError} from "../../helpers/index.js";

const moviesRouter = express.Router();

const movieAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" must be exist`
    }),
    director: Joi.string().required(),
})

moviesRouter.get("/", async(req, res, next)=> {
    try {
        const result = await moviesService.getAllMovies();
        res.json(result);
    }
    catch(error) {
        next(error);
    }
})

moviesRouter.get("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await moviesService.getMovieById(id);
        if(!result) {
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
    catch(error) {
        next(error);
    }
})

moviesRouter.post("/", async(req, res, next)=> {
    try {
        const {error} = movieAddSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const result = await moviesService.addMovie(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
})

moviesRouter.put("/:id", async(req, res, next) => {
    try {
        const {error} = movieAddSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await moviesService.updateMovieById(id, req.body);
        if(!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
        }

        res.json(result);
    }
    catch(error) {
        next(error);
    }
})

moviesRouter.delete("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await moviesService.deleteMovieById(id);
        if(!result) {
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
})

export default moviesRouter;