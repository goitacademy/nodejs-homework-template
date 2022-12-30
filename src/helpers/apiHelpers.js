// const {
//   ValidationError,
//   WrongContactIdError
// } = require('./errors')

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req,res).catch(next)
  }
}

// const errorHandler = (err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     return res.status(err.status).json({ message: err.message })
//   }
//   if (err instanceof WrongContactIdError) {
//     return res.status(err.status).json({message: "Not found"})
//   }

//   res.status(500).json({ message: err.message });
// }

module.exports = {
  asyncWrapper,
//   errorHandler
}