class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class WrongParameterError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class NotAuthorizedError extends Error {
  constructor(message) {
    super(message)
    this.status = 401
  }
}
module.exports = {
  ValidationError,
  WrongParameterError,
  NotAuthorizedError,
}
