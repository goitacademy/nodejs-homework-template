class ContactsServiceError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends ContactsServiceError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class WrongParametersError extends ContactsServiceError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAuthorizedError extends ContactsServiceError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

module.exports = {
  ContactsServiceError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
}
