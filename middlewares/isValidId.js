import { isValidObjectId } from 'mongoose'
import { notFoundHttpError } from '../helpers/notFoundHttpError.js'

export const isValidId = (req, _, next) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return next(notFoundHttpError(`${id} not valid id`))
  }
  next()
}
