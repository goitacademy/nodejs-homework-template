const {CustomError} = require("./errors")
const asyncWrapper = (controller) => {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }

const errorHandler = (err, req, res, next) => {  
  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message })
  }
  res.status(500).json({ message: err.message })
}
module.exports = { asyncWrapper, errorHandler };