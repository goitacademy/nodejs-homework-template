
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAuthorizedError extends ValidationError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

class TokenError extends ValidationError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}
module.exports = {
  ValidationError,
  NotAuthorizedError,
  TokenError
}
