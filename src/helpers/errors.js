class ContactsApiError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictdError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class ResizeError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}
class NotFoundError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class MessageSendError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 503;
  }
}

module.exports = {
  ContactsApiError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  ConflictdError,
  ResizeError,
  NotFoundError,
  MessageSendError,
};
