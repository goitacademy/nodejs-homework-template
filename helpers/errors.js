class YourLexContactsError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends YourLexContactsError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class WrongParametersError extends YourLexContactsError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class NotAuthorizedError extends YourLexContactsError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}
module.exports = { ValidationError, WrongParametersError, NotAuthorizedError, YourLexContactsError }
