import createHttpError from 'http-errors'

export const isEmptyBody = (req, _, next) => {
  const { length } = Object.keys(req.body)
  if (!length) {
    return next(new createHttpError.BadRequest('missing fields'))
  }
  next()
}
