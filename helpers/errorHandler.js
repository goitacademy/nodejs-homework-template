const errorHandler = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}
module.exports = {
  errorHandler
}
