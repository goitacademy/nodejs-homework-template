class NotFound extends Error {
  constructor(message = "Not found") {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends NotFound {
  constructor(message = "Validation error. Check all filds") {
    super(message);
    this.status = 400;
  }
}

class BadRequest extends NotFound {
  constructor(message = "Not Found") {
    super(message);
    this.status = 400;
  }
}

class Conflict extends NotFound {
  constructor(message = "Email in use") {
    super(message);
    this.status = 409;
  }
}

class Unauthorized extends NotFound {
  constructor(message = "Not authorized") {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ValidationError,
  BadRequest,
  NotFound,
  Conflict,
  Unauthorized,
};
