import createHttpError from 'http-errors'

export const notFoundHttpError = (msg) => new createHttpError.NotFound(msg)
