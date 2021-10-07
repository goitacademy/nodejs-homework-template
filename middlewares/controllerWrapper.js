const controllerWrapper = (contactsController) => {
  return async(req, res, next) => {
    try {
      await contactsController(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = controllerWrapper
