/// const { BadRequest } = require("http-errors")
/// const { register } = require("../controllers/users")

const controllerWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

// const { body } = reg;
// const result = await service.add(body)
// if (result) {
//     throw new BadRequest()
// }

module.exports = controllerWrapper
