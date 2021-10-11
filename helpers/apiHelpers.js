const { YourLexContactsError } = require('../helpers/errors')

const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof YourLexContactsError) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(500).json({ message: error.message })
}

module.exports = { asyncWrapper, errorHandler }
