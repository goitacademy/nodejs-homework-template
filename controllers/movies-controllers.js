import * as movieService from '../models/movies/movies.js'
import {HttpError} from '../helpers/index.js'
import { movieAddSchema, movieUpdateSchema } from "../schemas/movie-schemas.js";

const getAll = async(req, res) => {
try {
  const result = await movieService.getAllMovies()
  res.json(result)
} catch (error) {
  res.status(500).json({message: error.message})
}}
const getById = async(req, res, next) => {
  try {
    const {id} = req.params
    const result = await movieService.getMovieById(id)
    if(!result) {
      throw HttpError(404, `Movie with id=${id} not found`)
      // return res.status(404).json({
      //   message: `Movie with id=${id} not found`
      // })
    }
    res.json(result)
  } catch (error) {
    next(error)
  // res.status(500).json({message: error.message})
  }
}
const add = async(req, res, next) => {
  try {
    const {error} = movieAddSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.massege)
    }
    const result = await movieService.addMovie(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}
const updateById = async(req, res, next) => {
  try {
    const {error} = movieUpdateSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.massege)
    }
    const {id} = req.params
    const result = await movieService.updateMovieById(id, req.body)
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}
const deleteById = async(req, res, next) => {
  try {
    const {id} = req.params
    const result = await movieService.deleteById(id)
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json({
      message: 'Delete success'
    })
  } catch (error) {
    next(error)
  }
}


export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}