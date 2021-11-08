const controllerWrapper = (ctrl) => async (req, res, next) => {
  try {
    await ctrl(req, res, next)
  } catch (error) {
    next(error)
  }
}

module.exports = controllerWrapper
