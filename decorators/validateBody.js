import createHttpError from 'http-errors'

export const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return next(new createHttpError.BadRequest(error.message))
    }
    next()
  }
  return func
}
