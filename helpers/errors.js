class ApiErrorsTemplate extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ApiErrorsTemplate {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class GetContactError extends ApiErrorsTemplate {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class PostContactError extends ApiErrorsTemplate {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class DeleteContactError extends ApiErrorsTemplate {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class PutContactError extends ApiErrorsTemplate {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ConflictError extends ApiErrorsTemplate {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class UnauthorizedError extends ApiErrorsTemplate {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ApiErrorsTemplate,
  ValidationError,
  GetContactError,
  PostContactError,
  DeleteContactError,
  PutContactError,
  UnauthorizedError,
  ConflictError,
};
