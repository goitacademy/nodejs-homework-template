class RestApiError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class WrongParametersError extends RestApiError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class NotFoundError extends RestApiError {
  constructor(message) {
    super(message)
    this.status = 404
  }
}
class NotAuthorizedError extends RestApiError {
  constructor(message) {
    super(message)
    this.status = 404
  }
}

module.exports = {
  WrongParametersError,
  NotFoundError,
  RestApiError,
  NotAuthorizedError
}
