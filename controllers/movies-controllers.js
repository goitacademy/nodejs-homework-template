import * as movieService from '../models/movies/movies.js'
import {HttpError} from '../helpers/index.js'
import {ctrlWrapper} from '../decorators/index.js'


const getAll = async(req, res) => {
  const result = await movieService.getAllMovies()
  res.json(result)
}
const getById = async(req, res) => {
    const {id} = req.params
    const result = await movieService.getMovieById(id)
    if(!result) {
      throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json(result)
}
const add = async(req, res) => {
    const result = await movieService.addMovie(req.body)
    res.status(201).json(result)
}
const updateById = async(req, res) => {
    const {id} = req.params
    const result = await movieService.updateMovieById(id, req.body)
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json(result)
}
const deleteById = async(req, res) => {
    const {id} = req.params
    const result = await movieService.deleteById(id)
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json({
      message: 'Delete success'
    })
}


export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
}