import createHttpError from 'http-errors'
import { isValidObjectId } from 'mongoose'

export const isValidId = (req, _, next) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return next(new createHttpError.NotFound(`${id} not valid id`))
  }
  next()
}
